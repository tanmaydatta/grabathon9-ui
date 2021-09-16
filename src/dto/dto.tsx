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
  merchantID?: number;
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
}
export interface GetMenuRes {
  items: GetItemRes[];
}

export interface GetMenuReq {
  merchantID: number;
}
