import {
  InstagramUser,
  InstagramSource
} from "../types/instagram";





function cleanUsername(
  value: string
): string | null {


  const username =
    value
      .trim()
      .toLowerCase()
      .replace(/^@/, "")
      .replace(/^https?:\/\/(www\.)?instagram\.com\//, "")
      .replace(/[\/?#].*$/, "");



  if (
    !/^[a-z0-9._]+$/.test(username)
  ) {

    return null;

  }



  if (
    username.startsWith("__deleted__")
  ) {

    return null;

  }



  return username;

}







function extractTimestamp(
  item: any
): Date | null {


  const timestamp =
    item?.string_list_data?.[0]?.timestamp;



  if (
    typeof timestamp !== "number"
  ) {

    return null;

  }



  return new Date(
    timestamp * 1000
  );

}








export function extractUsersFromJSON(
  json: any,
  source: InstagramSource
): InstagramUser[] {



  const users =
    new Map<string, InstagramUser>();







  function processItem(
    item: any
  ) {


    if (
      !item
    ) {

      return;

    }





    let username: string | null =
      null;





    if (
      typeof item.title === "string"
    ) {

      username =
        cleanUsername(
          item.title
        );

    }






    if (
      !username &&
      Array.isArray(
        item.string_list_data
      )
    ) {


      const value =
        item.string_list_data[0]?.value;



      if (
        typeof value === "string"
      ) {

        username =
          cleanUsername(
            value
          );

      }


    }






    if (
      username
    ) {


      users.set(
        username,
        {

          username,


          profileUrl:
            `https://www.instagram.com/${username}/`,



          followedAt:
            extractTimestamp(
              item
            ),



          source

        }
      );


    }


  }









  function walk(
    value: any
  ) {


    if (
      Array.isArray(value)
    ) {


      value.forEach(
        item =>
          walk(item)
      );


      return;

    }






    if (
      typeof value === "object"
      &&
      value !== null
    ) {


      processItem(
        value
      );



      Object.values(value)
        .forEach(
          child =>
            walk(child)
        );


    }


  }







  walk(
    json
  );






  return Array.from(
    users.values()
  );

}
