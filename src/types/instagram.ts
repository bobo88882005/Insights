export interface InstagramUser {
  username: string;
  profileUrl: string;
  followedAt?: Date | null;
  source: "followers" | "following";
}

export interface ParsedInstagramData {
  followers: InstagramUser[];
  following: InstagramUser[];
  pendingRequests: InstagramUser[];
  receivedRequests: InstagramUser[];
  recentlyUnfollowed: InstagramUser[];
}

export interface InstagramAnalysis {
  followers: InstagramUser[];
  following: InstagramUser[];

  notFollowingBack: InstagramUser[];
  youDontFollowBack: InstagramUser[];

  pendingRequests: InstagramUser[];
  receivedRequests: InstagramUser[];
  recentlyUnfollowed: InstagramUser[];

  possibleInactive: InstagramUser[];
  excludedUsers: InstagramUser[];

  followersCount: number;
  followingCount: number;

  reciprocalCount: number;
  notFollowingBackCount: number;
  youDontFollowBackCount: number;
  inactiveCount: number;
}

export interface AnalysisSettings {
  excludeGhostUsers: boolean;
  excludeDeletedUsers: boolean;
  excludeCustomUsers: boolean;
}

export type UserListType =
  | "followers"
  | "following"
  | "not-following-back"
  | "you-dont-follow-back"
  | "inactive"
  | "pending"
  | "received"
  | "recently-unfollowed";
