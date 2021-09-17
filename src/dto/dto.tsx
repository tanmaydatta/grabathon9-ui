export interface UploadMediaReq {
  file: any;
}

export interface UploadMediaRes {
  mediaID: number;
}

export interface CreatePostReq {
  merchantID: number;
  mediaID: number;
  title: string;
  items: number[];
}

export interface CreatePostRes {
  postID: number;
}

export interface GetPostReq {
  merchantID: number;
  postID: number;
}

export interface GetPostRes {
  datePosted: Date;
  postID: number;
  mediaURL: string;
  title: string;
  logoUrl: string;
  merchantName: string;
  mediaType: string;
  merchantID: number;
  items: GetItemRes[];
  boosted: boolean;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export interface GetPostsReq {
  merchantID: number;
}

export interface GetPostsRes {
  posts: GetPostRes[];
}

export interface UploadRequest {
  file: File;
}

export interface UploadResponse {
  id: number;
}

export interface GetItemRes {
  id: number;
  mediaURL: string;
  name: string;
  currency: string;
  price: number;
  description: string;
}
export interface GetMenuRes {
  items: GetItemRes[];
}

export interface GetMenuReq {
  merchantID: number;
}

export interface GetMerchantRes {
  logoURL: string;
  name: string;
  id: number;
}

export interface GetMerchantReq {
  id: number;
}

export interface BoostPostReq {
  postID: number;
  days: number;
}

export interface BoostPostRes {
  success: boolean;
}

export interface DiscoverReq {
  userID: string;
}

export interface LikeReq {
  userID: number;
  postID: number;
}

export interface LikeRes {
  isLiked: boolean;
  likes: number;
}

export interface GetCommentsReq {
  postID: number;
}
export interface Comments {
  comments: Comment[];
}

export interface Comment {
  content: string;
  datePosted: Date;
  commentID: number;
  profileURL: string;
  userName: string;
}
