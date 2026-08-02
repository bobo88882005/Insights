import {
  InstagramAnalysis,
  ParsedInstagramData,
  InstagramUser
} from "../types/instagram";


import {
  isExcluded
} from "./exclusions";







function uniqueUsers(
  users:InstagramUser[]
):InstagramUser[]{


  const map =
    new Map<string,InstagramUser>();


  users.forEach(
    user=>{


      const username =
        user.username
          .toLowerCase()
          .trim();



      if(!username)
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
  data:ParsedInstagramData
):InstagramAnalysis {



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

    Questa è l'unica lista
    dei possibili inattivi
  */


  const possibleInactive =
    following.filter(
      user =>
        isExcluded(
          user.username
        )
    );








  /*
    Following reale
    senza esclusioni manuali
  */


  const cleanFollowing =
    following.filter(
      user =>
        !isExcluded(
          user.username
        )
    );









  const notFollowingBack =
    cleanFollowing.filter(
      user =>
        !followerNames.has(
          user.username
        )
    );









  const youDontFollowBack =
    followers.filter(
      user =>
        !followingNames.has(
          user.username
        )
    );









  const reciprocal =
    cleanFollowing.filter(
      user =>
        followerNames.has(
          user.username
        )
    );









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



    followersCount:
      followers.length,



    followingCount:
      cleanFollowing.length,



    originalFollowingCount:
      following.length,



    inactiveCount:
      possibleInactive.length,



    reciprocalCount:
      reciprocal.length,



    notFollowingBackCount:
      notFollowingBack.length,



    youDontFollowBackCount:
      youDontFollowBack.length

  };


}
