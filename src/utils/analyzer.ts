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
      user.username.toLowerCase(),
      user
    );

  });


  return Array.from(
    map.values()
  );

}







function removeDeletedUsers(
  users: InstagramUser[]
): InstagramUser[] {

  return users.filter(
    user =>
      !user.username.startsWith("__deleted__")
  );

}







export function analyzeInstagram(
  data: ParsedInstagramData
): InstagramAnalysis {



  const followers =
    removeDeletedUsers(
      uniqueUsers(
        data.followers
      )
    );



  const following =
    removeDeletedUsers(
      uniqueUsers(
        data.following
      )
    );





  const followerNames =
    new Set(
      followers.map(
        user =>
          user.username.toLowerCase()
      )
    );





  const followingNames =
    new Set(
      following.map(
        user =>
          user.username.toLowerCase()
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
          user.username.toLowerCase()
        )
    );








  const youDontFollowBack =
    followers.filter(
      user =>
        !followingNames.has(
          user.username.toLowerCase()
        )
    );








  const reciprocal =
    cleanFollowing.filter(
      user =>
        followerNames.has(
          user.username.toLowerCase()
        )
    );







  const reciprocalPercentage =

    cleanFollowing.length > 0

      ?

      Math.round(
        (reciprocal.length /
          cleanFollowing.length) *
        100
      )

      :

      0;







  const notFollowingBackPercentage =

    cleanFollowing.length > 0

      ?

      Math.round(
        (notFollowingBack.length /
          cleanFollowing.length) *
        100
      )

      :

      0;








  const engagementRate =

    followers.length > 0

      ?

      Math.round(
        (reciprocal.length /
          followers.length) *
        100
      )

      :

      0;








  const profileScore =

    Math.max(

      0,

      Math.min(

        100,

        Math.round(

          reciprocalPercentage -

          (
            notFollowingBackPercentage /
            2
          )

        )

      )

    );









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






    possibleInactive:
      excludedUsers,



    excludedUsers,







    followersCount:
      followers.length,



    followingCount:
      cleanFollowing.length,



    originalFollowingCount:
      following.length,



    excludedCount:
      excludedUsers.length,



    inactiveCount:
      excludedUsers.length,







    reciprocalCount:
      reciprocal.length,



    notFollowingBackCount:
      notFollowingBack.length,



    youDontFollowBackCount:
      youDontFollowBack.length,







    reciprocalPercentage,



    notFollowingBackPercentage,



    engagementRate,



    profileScore


  };

}
