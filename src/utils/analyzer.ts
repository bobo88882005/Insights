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


  users.forEach(
    user => {


      const username =
        user.username
          .toLowerCase()
          .trim();



      if(
        !username
      )
        return;



      if(
        username.startsWith("__deleted__")
      )
        return;



      map.set(
        username,
        {
          ...user,
          username
        }
      );


    }
  );



  return Array.from(
    map.values()
  );

}







export function analyzeInstagram(
  data: ParsedInstagramData
): InstagramAnalysis {



  /*
    Pulizia dati importati
    __deleted__ esclusi ovunque
  */


  const followers =
    uniqueUsers(
      data.followers
    );



  const following =
    uniqueUsers(
      data.following
    );



  const pendingRequests =
    uniqueUsers(
      data.pendingRequests
    );



  const receivedRequests =
    uniqueUsers(
      data.receivedRequests
    );



  const recentlyUnfollowed =
    uniqueUsers(
      data.recentlyUnfollowed
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
    Esclusioni manuali

    Questi utenti sono considerati
    possibili inattivi
  */


  const excludedUsers =
    following.filter(
      user =>
        isExcluded(
          user.username
        )
    );





  const cleanFollowing =
    following.filter(
      user =>
        !isExcluded(
          user.username
        )
    );







  /*
    Utenti che segui ma
    che non ti seguono
  */


  const notFollowingBack =
    cleanFollowing.filter(
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
    Follow reciproci
  */


  const reciprocal =
    cleanFollowing.filter(
      user =>
        followerNames.has(
          user.username
        )
    );








  /*
    Possibili inattivi

    SOLO esclusioni manuali
  */


  const possibleInactive =
    excludedUsers;







  return {


    followers,


    following:
      cleanFollowing,



    notFollowingBack,



    youDontFollowBack,



    pendingRequests,



    receivedRequests,



    recentlyUnfollowed,



    possibleInactive,



    excludedUsers,



    followersCount:
      followers.length,



    followingCount:
      cleanFollowing.length,



    originalFollowingCount:
      following.length,



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
