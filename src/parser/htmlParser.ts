import { InstagramUser } from "../types/instagram";



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


  return username;

}




function extractTimestamp(
  text: string
): Date | null {


  const match =
    text.match(
      /timestamp["']?\s*[:=]\s*["']?(\d+)/i
    );


  if (!match)
    return null;


  return new Date(
    Number(match[1]) * 1000
  );

}





export function extractUsersFromHTML(
  html: string,
  source:
    | "followers"
    | "following"
    | "pending"
    | "received"
    | "recentlyUnfollowed"
): InstagramUser[] {



  const users =
    new Map<string, InstagramUser>();



  const decoded =
    html
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&amp;/g, "&");





  const links =
    decoded.matchAll(
      /href=["']([^"']*instagram\.com\/[^"']+)["']/gi
    );



  for (
    const match of links
  ) {


    const username =
      cleanUsername(
        match[1]
      );



    if (username) {


      users.set(
        username,
        {

          username,

          profileUrl:
            `https://www.instagram.com/${username}/`,

          followedAt:
            extractTimestamp(
              match[0]
            ),

          source

        }
      );

    }

  }






  const h2 =
    decoded.match(
      /<h2[^>]*>(.*?)<\/h2>/gis
    );



  if (h2) {


    h2.forEach(
      item => {


        const username =
          cleanUsername(
            item.replace(
              /<[^>]+>/g,
              ""
            )
          );



        if (username) {


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
    );

  }




  return Array.from(
    users.values()
  );

}
