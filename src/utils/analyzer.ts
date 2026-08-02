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

    map.set(
      user.username,
      user
    );

  });


  return Array.from(
    map.values()
  );

}




export function analyzeInstagram(
  data: ParsedInstagramData
): InstagramAnalysis {



  const followers =
    uniqueUsers(
      data.followers
    );



  const following =
    uniqueUsers(
      data.following
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





  /*
    Al momento gli inattivi
    coincidono con gli utenti
    esclusi manualmente.

    In seguito aggiungeremo:
    - profili senza attività
    - profili eliminati
    - segnali dall'export Instagram
  */

  const possibleInactive =
    excludedUsers;





  return {


    followers,


    following:
      cleanFollowing,



    notFollowingBack,



    youDontFollowBack,



    pendingRequests:
      data.pendingRequests,



    receivedRequests:
      data.receivedRequests,



    recentlyUnfollowed:
      data.recentlyUnfollowed,



    possibleInactive,



    excludedUsers,



    followersCount:
      followers.length,



    // following effettivi dopo esclusioni
    followingCount:
      cleanFollowing.length,



    // following originali dall'export
    originalFollowingCount:
      following.length,



    // utenti esclusi manualmente
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
