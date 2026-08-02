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
      user.username.toLowerCase();



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



  const followers =
    uniqueUsers(
      data.followers
    );



  const originalFollowing =
    uniqueUsers(
      data.following
    );




  const excludedUsers =
    originalFollowing.filter(
      user =>
        isExcluded(
          user.username
        )
    );





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






  const notFollowingBack =
    following.filter(
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
    following.filter(
      user =>
        followerNames.has(
          user.username
        )
    );






  const possibleInactive =
    following.filter(
      user => {

        const name =
          user.username.toLowerCase();


        return (

          name.length > 25

          ||

          name.includes("inactive")

          ||

          name.includes("deleted")

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
