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


  if (!match) {

    return null;

  }


  return new Date(
    Number(match[1]) * 1000
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





  // Estrae dagli href Instagram

  const hrefMatches =
    decoded.matchAll(
      /href=["']([^"']*instagram\.com\/[^"']+)["']/gi
    );



  for (
    const match of hrefMatches
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







  // Estrae eventuali username dentro h2

  const headings =
    decoded.match(
      /<h2[^>]*>(.*?)<\/h2>/gis
    );



  if (headings) {


    headings.forEach(
      block => {


        const username =
          cleanUsername(
            block.replace(
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
                  block
                ),

              source

            }
          );


        }


      }
    );

  }







  // Fallback: cerca testo username nei link senza URL completo

  const plainLinks =
    decoded.matchAll(
      /<a[^>]*>(.*?)<\/a>/gis
    );



  for (
    const match of plainLinks
  ) {


    const username =
      cleanUsername(
        match[1].replace(
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
            null,

          source

        }
      );

    }

  }



  return Array.from(
    users.values()
  );

}
