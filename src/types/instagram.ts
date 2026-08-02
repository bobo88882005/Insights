export type InstagramSource =
  | "followers"
  | "following"
  | "pending"
  | "received"
  | "recentlyUnfollowed";




export interface InstagramUser {

  username:string;

  profileUrl:string;

  followedAt:Date | null;

  source:InstagramSource;

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





  followersCount:number;


  followingCount:number;


  originalFollowingCount:number;


  inactiveCount:number;





  reciprocalCount:number;


  notFollowingBackCount:number;


  youDontFollowBackCount:number;





  reciprocalPercentage:number;


  notFollowingBackPercentage:number;


  engagementRate:number;


  profileScore:number;

}
