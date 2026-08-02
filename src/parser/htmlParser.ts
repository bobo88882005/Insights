import { InstagramUser } from "../types/instagram";

function cleanUsername(value: string): string | null {
  const username = value
    .trim()
    .toLowerCase()
    .replace("@", "")
    .replace("/", "");

  if (!/^[a-z0-9._]+$/.test(username)) {
    return null;
  }

  return username;
}


export function extractUsersFromHTML(
  html: string,
  source: "followers" | "following"
): InstagramUser[] {

  const users = new Map<string, InstagramUser>();

  const decoded = html
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&");


  // Cerca link Instagram
  const links = decoded.match(
    /instagram\.com\/[a-zA-Z0-9._]+/gi
  );


  if (links) {
    links.forEach(link => {

      const username = cleanUsername(
        link.replace(/instagram\.com\//i, "")
      );

      if (username) {
        users.set(username, {
          username,
          profileUrl:
            `https://www.instagram.com/${username}/`,
          followedAt: null,
          source
        });
      }

    });
  }


  // Cerca username dentro h2
  const h2 = decoded.match(
    /<h2[^>]*>(.*?)<\/h2>/gis
  );


  if (h2) {

    h2.forEach(item => {

      const username = cleanUsername(
        item.replace(/<[^>]+>/g, "")
      );


      if (username) {
        users.set(username, {
          username,
          profileUrl:
            `https://www.instagram.com/${username}/`,
          followedAt: null,
          source
        });
      }

    });

  }


  return Array.from(users.values());
}
