import { InstagramUser } from "../types/instagram";


function cleanUsername(
  value: string
): string | null {

  const username =
    value
      .trim()
      .toLowerCase()
      .replace(/^@/, "");


  if (!username)
    return null;


  if (
    username.startsWith("__deleted__")
  )
    return null;


  if (
    !/^[a-z0-9._]+$/.test(username)
  )
    return null;


  return username;

}




function extractTimestamp(
  text: string
): Date | null {


  const match =
    text.match(
      /datetime="([^"]+)"/i
    );


  if (!match)
    return null;


  const date =
    new Date(
      match[1]
    );


  if(
    isNaN(
      date.getTime()
    )
  )
    return null;


  return date;

}




function addUser(
  users: Map<string, InstagramUser>,

  username: string,

  source:
    "followers" |
    "following"
) {


  const clean =
    cleanUsername(
      username
    );


  if(!clean)
    return;


  if(
    users.has(clean)
  )
    return;



  users.set(
    clean,
    {

      username: clean,


      profileUrl:
        `https://www.instagram.com/${clean}/`,


      followedAt:
        null,


      source

    }
  );

}





export function extractUsersFromHTML(
  html: string,

  source:
    "followers" |
    "following"
): InstagramUser[] {



  const users =
    new Map<string, InstagramUser>();



  const decoded =
    html
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&amp;/g, "&");





  /*
    1) Vecchio formato Instagram

    <a href="https://instagram.com/user">
  */


  const links =
    decoded.match(
      /instagram\.com\/[a-zA-Z0-9._]+/gi
    );



  if(links){


    links.forEach(
      link => {


        addUser(
          users,

          link.replace(
            /instagram\.com\//i,
            ""
          ),

          source
        );


      }
    );

  }








  /*
    2) Nuovo formato Instagram

    <td>Nome utente</td>
    <td>username</td>

  */


  const usernameMatches =
    decoded.matchAll(
      /Nome utente<\/td>\s*<td[^>]*>(.*?)<\/td>/gis
    );



  for(
    const match of usernameMatches
  ){


    const username =
      match[1]
        .replace(
          /<[^>]+>/g,
          ""
        )
        .trim();



    addUser(
      users,

      username,

      source
    );

  }








  /*
    3) Formato con h2

  */


  const h2 =
    decoded.match(
      /<h2[^>]*>(.*?)<\/h2>/gis
    );



  if(h2){


    h2.forEach(
      item => {


        const username =
          item
            .replace(
              /<[^>]+>/g,
              ""
            )
            .trim();



        addUser(
          users,

          username,

          source
        );


      }
    );

  }







  return Array.from(
    users.values()
  );

}
