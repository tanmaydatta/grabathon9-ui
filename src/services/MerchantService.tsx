import { HttpFileClient, HttpClient } from "../http-common";
import {
  CreatePostReq,
  CreatePostRes,
  GetPostReq,
  GetPostRes,
  GetPostsReq,
  GetPostsRes,
  UploadRequest,
  UploadResponse,
} from "../dto/dto";

const uploadMedia = async (req: UploadRequest): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", req.file);
  return HttpFileClient.post(`/merchant/upload`, formData).then((body) => {
    console.log(body.data);
    return {
      id: body.data.id,
    };
  });
};

const createPost = async (req: CreatePostReq): Promise<CreatePostRes> => {
  const params = JSON.stringify({
    title: req.title,
    media_id: req.mediaID,
  });
  return HttpClient.post(`/merchant/${req.merchantID}/post`, params).then(
    (body) => {
      console.log(body.data);
      return {
        postID: body.data.id,
      };
    }
  );
};

const getPost = async (req: GetPostReq): Promise<GetPostRes> => {
  return HttpClient.get(`/merchant/${req.merchantID}/post/${req.postID}`).then(
    (body) => {
      console.log(body.data);
      return {
        mediaURL: body.data.media_url,
        datePosted: body.data.date_posted,
        postID: body.data.id,
        title: body.data.title,
        merchantName: body.data.merchant_name,
        mediaType: body.data.media_mimetype,
        logoUrl: body.data.logo_url,
      };
    }
  );
};

const getPosts = async (req: GetPostsReq): Promise<GetPostsRes> => {
  return HttpClient.get(`/merchant/${req.merchantID}/posts`).then((body) => {
    console.log(body);
    var posts = body.data.posts as any[];
    return {
      posts: posts.map((post): GetPostRes => {
        return {
          title: post.title,
          mediaURL: post.media_url,
          postID: post.id,
          datePosted: post.date_posted,
          merchantName: post.merchant_name,
          mediaType: post.media_mimetype,
          logoUrl: post.logo_url,
        };
      }),
    };
  });
};

const discover = async (): Promise<GetPostsRes> => {
  return HttpClient.get(`/discover`).then((body) => {
    console.log(body);
    var posts = body.data.posts as any[];
    return {
      posts: posts.map((post): GetPostRes => {
        return {
          title: post.title,
          mediaURL: post.media_url,
          postID: post.id,
          datePosted: post.date_posted,
          merchantName: post.merchant_name,
          mediaType: post.media_mimetype,
          logoUrl: post.logo_url,
          merchantID: post.merchant_id,
        };
      }),
    };
  });
};

const MerchantService = {
  uploadMedia,
  createPost,
  getPost,
  getPosts,
  discover,
};

export default MerchantService;
