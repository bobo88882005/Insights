export interface InstagramUser {

  username:string;

  profileUrl:string;

  followedAt:Date | null;

  source:
    "followers" |
    "following";

}




export interface ParsedInstagramData {

  followers:InstagramUser[];

  following:InstagramUser[];

  pendingRequests:InstagramUser[];

  receivedRequests:InstagramUser[];

  recentlyUnfollowed:InstagramUser[];

}




export interface InstagramAnalysis {


  followers:InstagramUser[];


  following:InstagramUser[];


  notFollowingBack:InstagramUser[];


  youDontFollowBack:InstagramUser[];



  pendingRequests:InstagramUser[];


  receivedRequests:InstagramUser[];


  recentlyUnfollowed:InstagramUser[];



  possibleInactive:InstagramUser[];


  excludedUsers:InstagramUser[];



  followersCount:number;


  followingCount:number;


  originalFollowingCount:number;


  excludedCount:number;



  reciprocalCount:number;


  notFollowingBackCount:number;


  youDontFollowBackCount:number;


  inactiveCount:number;

}
