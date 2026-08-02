import JSZip from "jszip";
import { extractUsersFromHTML } from "./htmlParser";
import { extractUsersFromJSON } from "./jsonParser";
import { ParsedInstagramData, InstagramUser } from "../types/instagram";


function mergeUsers(
  current: InstagramUser[],
  incoming: InstagramUser[]
): InstagramUser[] {

  const map = new Map<string, InstagramUser>();

  [
    ...current,
    ...incoming
  ].forEach(user => {

    map.set(
      user.username,
      user
    );

  });

  return Array.from(map.values());
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
  )
    return "following";


  if (
    name.includes("pending")
  )
    return "pending";


  if (
    name.includes("follow_requests_you")
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


    if (item.dir)
      continue;



    const type =
      detectType(filename);



    if (!type)
      continue;



    const extension =
      filename
        .toLowerCase();



    try {


      let users: InstagramUser[] = [];



      if (
        extension.endsWith(".html")
      ) {


        const html =
          await item.async("string");


        users =
          extractUsersFromHTML(
            html,
            type === "following"
              ? "following"
              : "followers"
          );

      }



      else if (
        extension.endsWith(".json")
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

      console.warn(
        "Errore lettura file:",
        filename,
        error
      );

    }

  }


  return result;

}
