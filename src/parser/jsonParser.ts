import { InstagramUser } from "../types/instagram";


function createUser(
  username: string,
  source: "followers" | "following",
  timestamp?: number
): InstagramUser | null {


  const clean =
    username
      .trim()
      .toLowerCase()
      .replace("@", "");



  if (
    !/^[a-z0-9._]+$/.test(clean)
  ) {
    return null;
  }



  return {

    username: clean,

    profileUrl:
      `https://www.instagram.com/${clean}/`,

    followedAt:
      timestamp
        ? new Date(timestamp * 1000)
        : null,

    source

  };

}




export function extractUsersFromJSON(
  json: any,
  source: "followers" | "following"
): InstagramUser[] {


  const users =
    new Map<string, InstagramUser>();



  function scan(
    value:any
  ) {


    if (!value)
      return;



    if (Array.isArray(value)) {

      value.forEach(
        item => scan(item)
      );

      return;

    }




    if (
      typeof value === "object"
    ) {



      if (
        value.string_list_data &&
        Array.isArray(
          value.string_list_data
        )
      ) {


        value.string_list_data.forEach(
          (item:any)=>{


            if (
              item.value
            ) {


              const user =
                createUser(
                  item.value,
                  source,
                  item.timestamp
                );



              if (user) {

                users.set(
                  user.username,
                  user
                );

              }

            }


          }
        );

      }




      Object.values(value)
        .forEach(
          child =>
            scan(child)
        );


    }


  }



  scan(json);



  return Array.from(
    users.values()
  );

}
