import { InstagramUser } from "../types/instagram";


function cleanUsername(
  value:string
): string | null {

  const username =
    value
      .trim()
      .toLowerCase()
      .replace("@","")
      .trim();


  if(
    !/^[a-z0-9._]+$/.test(username)
  ){
    return null;
  }


  if(
    username.startsWith("__deleted__")
  ){
    return null;
  }


  return username;

}




function extractTimestamp(
  text:string
): Date | null {


  const match =
    text.match(
      /datetime="([^"]+)"/i
    );


  if(match){

    const date =
      new Date(match[1]);

    if(!isNaN(date.getTime()))
      return date;

  }


  return null;

}





function addUser(
  map:Map<string,InstagramUser>,
  username:string,
  source:
    "followers" |
    "following"
){

  const clean =
    cleanUsername(username);


  if(!clean)
    return;


  map.set(
    clean,
    {
      username:clean,

      profileUrl:
        `https://www.instagram.com/${clean}/`,

      followedAt:null,

      source
    }
  );

}





export function extractUsersFromHTML(
  html:string,

  source:
    "followers" |
    "following"
):InstagramUser[]{



  const users =
    new Map<string,InstagramUser>();



  const decoded =
    html
      .replace(/&quot;/g,'"')
      .replace(/&#x27;/g,"'")
      .replace(/&amp;/g,"&");





  /*
    Metodo 1:
    link Instagram
  */


  const links =
    decoded.match(
      /instagram\.com\/[a-zA-Z0-9._]+/gi
    );



  if(links){

    links.forEach(link=>{

      addUser(
        users,

        link.replace(
          /instagram\.com\//i,
          ""
        ),

        source
      );


    });

  }







  /*
    Metodo 2:
    nuovi export Instagram 2026

    Nome utente
    username
  */


  const usernameBlocks =
    decoded.matchAll(
      /Nome utente<\/td>\s*<td[^>]*>(.*?)<\/td>/gis
    );



  for(
    const block of usernameBlocks
  ){

    const username =
      block[1]
        .replace(/<[^>]+>/g,"")
        .trim();



    addUser(
      users,
      username,
      source
    );

  }







  /*
    Metodo 3:
    vecchi export con h2
  */


  const h2 =
    decoded.match(
      /<h2[^>]*>(.*?)<\/h2>/gis
    );



  if(h2){

    h2.forEach(item=>{


      const username =
        item
          .replace(/<[^>]+>/g,"")
          .trim();



      addUser(
        users,
        username,
        source
      );


    });

  }






  return Array.from(
    users.values()
  );

}
