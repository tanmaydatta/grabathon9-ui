import { HttpFileClient, HttpClient } from "../http-common";
import {
  BoostPostReq,
  BoostPostRes,
  Comment,
  CommentReq,
  Comments,
  CreatePostReq,
  CreatePostRes,
  DiscoverReq,
  GetCommentsReq,
  GetItemRes,
  GetMenuRes,
  GetMerchantReq,
  GetMerchantRes,
  GetPostReq,
  GetPostRes,
  GetPostsReq,
  GetPostsRes,
  LikeReq,
  LikeRes,
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
        boosted: body.data.is_boosted,
        likes: body.data.likes,
        comments: body.data.comments,
        isLiked: body.data.is_liked,
        merchantID: body.data.merchant_id,
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
          boosted: post.is_boosted,
          likes: post.likes,
          comments: post.comments,
          isLiked: post.is_liked,
          merchantID: post.merchant_id,
        };
      }),
    };
  });
};

const discover = async (req: DiscoverReq): Promise<GetPostsRes> => {
  return HttpClient.get(`/user/${req.userID}/discover`).then((body) => {
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
          boosted: post.is_boosted,
          likes: post.likes,
          comments: post.comments,
          isLiked: post.is_liked,
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

const boostPost = async (req: BoostPostReq): Promise<BoostPostRes> => {
  const params = JSON.stringify({
    days: req.days,
  });
  return HttpClient.post(`/post/${req.postID}/boost`, params).then((body) => {
    console.log(body.data);
    return {
      success: body.data.success,
    };
  });
};

const likePost = async (req: LikeReq): Promise<LikeRes> => {
  const params = JSON.stringify({
    user_id: req.userID,
  });
  return HttpClient.post(`/post/${req.postID}/like`, params).then((body) => {
    console.log(body.data);
    return {
      isLiked: body.data.is_liked,
      likes: body.data.total_likes,
    };
  });
};

const getComments = async (req: GetCommentsReq): Promise<Comments> => {
  return HttpClient.get(`/post/${req.postID}/comment`).then((body) => {
    console.log(body.data);
    var items = body.data.comments as any[];
    return {
      comments: items.map((item): Comment => {
        return {
          content: item.content,
          datePosted: item.date_posted,
          commentID: item.id,
          profileURL: item.profile_url,
          userName: item.user_name,
        };
      }),
    };
  });
};

const postComment = async (req: CommentReq): Promise<void> => {
  const params = JSON.stringify({
    content: req.content,
    user_id: req.userID,
  });
  return HttpClient.post(`/post/${req.postID}/comment`, params).then((body) => {
    return;
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
  boostPost,
  likePost,
  getComments,
  postComment,
};

export default MerchantService;
