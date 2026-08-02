import JSZip from "jszip";

import { extractUsersFromHTML } from "./htmlParser";
import { extractUsersFromJSON } from "./jsonParser";

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
  ].forEach(user => {

    map.set(
      user.username.toLowerCase(),
      user
    );

  });


  return Array.from(
    map.values()
  );

}





function detectType(
  filename: string
):
"followers" |
"following" |
"pending" |
"received" |
"recentlyUnfollowed" |
null {


  const name =
    filename.toLowerCase();



  if (
    name.includes("followers")
  )
    return "followers";



  if (
    name.includes("following")
    &&
    !name.includes("followers")
  )
    return "following";



  if (
    name.includes("pending_follow_requests")
  )
    return "pending";



  if (
    name.includes("follow_requests_you")
    ||
    name.includes("received")
  )
    return "received";



  if (
    name.includes("recently_unfollowed")
  )
    return "recentlyUnfollowed";



  return null;

}





export async function readInstagramZip(
  file: File
): Promise<ParsedInstagramData> {



  const zip =
    await JSZip.loadAsync(file);



  const result: ParsedInstagramData = {

    followers: [],

    following: [],

    pendingRequests: [],

    receivedRequests: [],

    recentlyUnfollowed: []

  };




  for (
    const filename of Object.keys(zip.files)
  ) {


    const item =
      zip.files[filename];


    if (
      item.dir
    )
      continue;



    const type =
      detectType(filename);



    console.log(
      "FILE TROVATO:",
      filename,
      "TIPO:",
      type
    );



    if (
      !type
    )
      continue;




    try {


      let users: InstagramUser[] = [];

      const lower =
        filename.toLowerCase();




      if (
        lower.endsWith(".html")
      ) {


        const html =
          await item.async("string");



        console.log(
          "HTML LETTO:",
          filename,
          "caratteri:",
          html.length
        );



        users =
          extractUsersFromHTML(
            html,
            type === "following"
              ? "following"
              : "followers"
          );


      }



      else if (
        lower.endsWith(".json")
      ) {


        const json =
          JSON.parse(
            await item.async("string")
          );


        users =
          extractUsersFromJSON(
            json,
            type === "following"
              ? "following"
              : "followers"
          );

      }




      console.log(
        "UTENTI ESTRATTI:",
        filename,
        users.length
      );




      switch(type) {


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
    catch(error) {


      console.error(
        "ERRORE FILE:",
        filename,
        error
      );


    }


  }




  console.log(
    "RISULTATO FINALE:",
    {
      followers:
        result.followers.length,

      following:
        result.following.length,

      pending:
        result.pendingRequests.length,

      received:
        result.receivedRequests.length,

      unfollowed:
        result.recentlyUnfollowed.length
    }
  );



  return result;

}
