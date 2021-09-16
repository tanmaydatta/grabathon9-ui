import { HttpFileClient, HttpClient } from "../http-common";
import {
  CreatePostReq,
  CreatePostRes,
  GetItemRes,
  GetMenuRes,
  GetMerchantReq,
  GetMerchantRes,
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
  return HttpFileClient.post(`/media/upload`, formData).then((body) => {
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
    items: req.items,
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
        items: getItemResFromBody(body.data.items),
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
          items: getItemResFromBody(post.items),
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
          items: getItemResFromBody(post.items),
        };
      }),
    };
  });
};

const getMenu = async (req: GetPostsReq): Promise<GetMenuRes> => {
  return HttpClient.get(`/merchant/${req.merchantID}/menu`).then((body) => {
    console.log(body);
    var items = body.data.items as any[];
    return {
      items: items.map((item): GetItemRes => {
        return {
          id: item.id,
          mediaURL: item.media_url,
          name: item.name,
          price: item.price,
          currency: item.currency,
          description: item.description,
        };
      }),
    };
  });
};

const getMerchant = async (req: GetMerchantReq): Promise<GetMerchantRes> => {
  return HttpClient.get(`/merchant/${req.id}`).then((body) => {
    console.log(body.data);
    return {
      id: req.id,
      name: body.data.name,
      logoURL: body.data.logo_url,
    };
  });
};

const getItemResFromBody = (items: any[]): GetItemRes[] => {
  return items.map((item) => {
    return {
      id: item.id,
      mediaURL: item.media_url,
      name: item.name,
      price: item.price,
      currency: item.currency,
      description: item.description,
    };
  });
};
const MerchantService = {
  uploadMedia,
  createPost,
  getPost,
  getPosts,
  discover,
  getMenu,
  getMerchant,
};

export default MerchantService;
