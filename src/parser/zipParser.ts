import JSZip from "jszip";

import {
  extractUsersFromHTML
} from "./htmlParser";

import {
  extractUsersFromJSON
} from "./jsonParser";

import {
  ParsedInstagramData,
  InstagramUser
} from "../types/instagram";




function mergeUsers(
  current: InstagramUser[],
  incoming: InstagramUser[]
): InstagramUser[] {


  const map =
    new Map<string, InstagramUser>();


  [
    ...current,
    ...incoming

  ].forEach(
    user => {


      map.set(
        user.username.toLowerCase(),
        user
      );


    }
  );



  return Array.from(
    map.values()
  );

}





function detectType(
  filename:string
):
"followers" |
"following" |
"pending" |
"received" |
"recentlyUnfollowed" |
null {



  const name =
    filename
      .split("/")
      .pop()!
      .toLowerCase();




  if(
    name === "followers_1.html" ||
    name === "followers_1.json"
  )
    return "followers";




  if(
    name === "following.html" ||
    name === "following.json"
  )
    return "following";




  if(
    name === "pending_follow_requests.html" ||
    name === "pending_follow_requests.json"
  )
    return "pending";




  if(
    name === "follow_requests_you've_received.html" ||
    name === "follow_requests_you've_received.json"
  )
    return "received";




  if(
    name === "recently_unfollowed_profiles.html" ||
    name === "recently_unfollowed_profiles.json"
  )
    return "recentlyUnfollowed";




  return null;

}







export async function readInstagramZip(
  file: File
): Promise<ParsedInstagramData> {



  const zip =
    await JSZip.loadAsync(file);




  const result: ParsedInstagramData =
  {

    followers: [],

    following: [],

    pendingRequests: [],

    receivedRequests: [],

    recentlyUnfollowed: []

  };







  for(
    const filename of Object.keys(zip.files)
  ){


    const item =
      zip.files[filename];



    if(item.dir)
      continue;




    const type =
      detectType(filename);




    console.log(
      "FILE TROVATO:",
      filename,
      "TIPO:",
      type
    );




    if(!type)
      continue;





    try {



      let users: InstagramUser[] = [];




      const lower =
        filename.toLowerCase();





      if(
        lower.endsWith(".html")
      ){



        const html =
          await item.async(
            "string"
          );



        console.log(
          "HTML LETTO:",
          filename,
          "caratteri:",
          html.length
        );



        users =
          extractUsersFromHTML(
            html,

            (
              type === "following"
            )
              ? "following"
              : "followers"
          );



      }







      else if(
        lower.endsWith(".json")
      ){



        const json =
          JSON.parse(
            await item.async(
              "string"
            )
          );



        users =
          extractUsersFromJSON(
            json,

            (
              type === "following"
            )
              ? "following"
              : "followers"
          );


      }






      console.log(
        "UTENTI ESTRATTI:",
        filename,
        users.length
      );








      switch(type){



        case "followers":

          result.followers =
            mergeUsers(
              result.followers,
              users
            );

          break;




        case "following":

          result.following =
            mergeUsers(
              result.following,
              users
            );

          break;




        case "pending":

          result.pendingRequests =
            mergeUsers(
              result.pendingRequests,
              users
            );

          break;




        case "received":

          result.receivedRequests =
            mergeUsers(
              result.receivedRequests,
              users
            );

          break;




        case "recentlyUnfollowed":

          result.recentlyUnfollowed =
            mergeUsers(
              result.recentlyUnfollowed,
              users
            );

          break;


      }





    }
    catch(error){


      console.warn(
        "Errore lettura file:",
        filename,
        error
      );


    }


  }




  return result;


}
