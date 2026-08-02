import {
  InstagramAnalysis,
  ParsedInstagramData,
  InstagramUser
} from "../types/instagram";

import {
  isExcluded
} from "./exclusions";



function uniqueUsers(
  users: InstagramUser[]
): InstagramUser[] {


  const map =
    new Map<string, InstagramUser>();



  users.forEach(user => {


    const username =
      user.username
        .toLowerCase()
        .trim();



    // Ignora profili eliminati da Instagram
    if (
      username.startsWith("__deleted__")
    ) {

      return;

    }



    map.set(
      username,
      {
        ...user,
        username
      }
    );


  });



  return Array.from(
    map.values()
  );

}







export function analyzeInstagram(
  data: ParsedInstagramData
): InstagramAnalysis {



  /*
    Pulizia iniziale:
    rimuove duplicati e profili __deleted__
  */


  const followers =
    uniqueUsers(
      data.followers
    );



  const originalFollowing =
    uniqueUsers(
      data.following
    );





  /*
    Esclusioni manuali
  */


  const excludedUsers =
    originalFollowing.filter(
      user =>
        isExcluded(
          user.username
        )
    );





  /*
    Following effettivo
    senza esclusioni manuali
  */


  const following =
    originalFollowing.filter(
      user =>
        !isExcluded(
          user.username
        )
    );







  const followerNames =
    new Set(
      followers.map(
        user =>
          user.username
      )
    );



  const followingNames =
    new Set(
      following.map(
        user =>
          user.username
      )
    );







  /*
    Utenti che segui
    ma che non ti seguono
  */


  const notFollowingBack =
    following.filter(
      user =>
        !followerNames.has(
          user.username
        )
    );







  /*
    Utenti che ti seguono
    ma che tu non segui
  */


  const youDontFollowBack =
    followers.filter(
      user =>
        !followingNames.has(
          user.username
        )
    );







  /*
    Seguiti reciproci
  */


  const reciprocal =
    following.filter(
      user =>
        followerNames.has(
          user.username
        )
    );







  /*
    Possibili inattivi:
    prima versione basata su segnali
    dell'username
  */


  const possibleInactive =
    following.filter(
      user => {


        const username =
          user.username.toLowerCase();



        return (

          username.length > 25

          ||

          username.includes(
            "inactive"
          )

          ||

          username.includes(
            "deleted"
          )

        );

      }
    );








  return {



    followers,



    following,



    notFollowingBack,



    youDontFollowBack,



    pendingRequests:
      uniqueUsers(
        data.pendingRequests
      ),



    receivedRequests:
      uniqueUsers(
        data.receivedRequests
      ),



    recentlyUnfollowed:
      uniqueUsers(
        data.recentlyUnfollowed
      ),



    possibleInactive,



    excludedUsers,



    followersCount:
      followers.length,



    followingCount:
      following.length,



    originalFollowingCount:
      originalFollowing.length,



    excludedCount:
      excludedUsers.length,



    reciprocalCount:
      reciprocal.length,



    notFollowingBackCount:
      notFollowingBack.length,



    youDontFollowBackCount:
      youDontFollowBack.length,



    inactiveCount:
      possibleInactive.length


  };

}
