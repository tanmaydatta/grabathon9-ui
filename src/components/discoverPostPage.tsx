import * as React from "react";
import { RouterProps } from "react-router-dom";
import "../css/App.css";
import MerchantService from "../services/MerchantService";
import "../css/postPage.css";
import { GetPostRes } from "../dto/dto";
import DiscoverPost from "./discoverPost";
import ItemsBelowPost from "./itemsBelowPost";

interface DiscoverPostPageProps {
  postID: string;
  merchantID: string;
  routerProps: RouterProps;
  userID: string;
}

interface DiscoverPostPageState {
  loading: boolean;
  success: boolean;
  post: GetPostRes;
}

export default class DiscoverPostPage extends React.Component<
  DiscoverPostPageProps,
  DiscoverPostPageState
> {
  constructor(props: DiscoverPostPageProps) {
    super(props);
    this.state = {
      loading: true,
      success: true,
      post: {
        merchantID: 0,
        comments: 0,
        mediaType: "",
        mediaURL: "",
        logoUrl: "",
        title: "",
        merchantName: "",
        datePosted: new Date(),
        postID: 0,
        items: [],
        boosted: false,
        likes: 0,
        isLiked: false,
      },
    };
  }

  componentDidMount() {
    MerchantService.getPost({
      postID: Number(this.props.postID),
      merchantID: Number(this.props.merchantID),
    })
      .then((resp) => {
        console.log("setting state in success");
        this.setState({
          ...this.state,
          post: resp,
          success: true,
          loading: false,
        });
      })
      .catch((e) => {
        console.log("setting state in fail");
        console.log(e);
        this.setState({
          ...this.state,
          success: false,
          loading: false,
        });
      });
  }

  onLike() {
    let post = this.state.post;
    if (!post) {
      return;
    }
    if (isNaN(Number(this.props.userID))) {
      return;
    }
    MerchantService.likePost({
      userID: Number(this.props.userID),
      postID: post.postID,
    })
      .then((res) => {
        post.isLiked = res.isLiked;
        post.likes = res.likes;

        this.setState({
          ...this.state,
          post: post,
        });
      })
      .catch((e) => {
        alert("Not able to like post!");
      });
  }

  public render() {
    const state = this.state;
    const post = state.post;
    return (
      <div className="App">
        <div hidden={!state.loading}>Loading ...</div>
        <div hidden={state.loading || state.success}>
          Error occurred. Check console
        </div>
        <div
          className="DiscoverPostPage"
          hidden={state.loading || !state.success}
        >
          <DiscoverPost
            postIndex={0}
            userID={this.props.userID}
            isLiked={post.isLiked}
            boosted={post.boosted}
            likes={post.likes}
            mediaType={post.mediaType}
            logoURL={post.logoUrl}
            merchantName={post.merchantName}
            mediaURL={post.mediaURL}
            date={post.datePosted}
            postID={post.postID}
            title={post.title}
            merchantID={this.props.merchantID}
            routerProps={this.props.routerProps}
            comments={post.comments}
            onLike={this.onLike.bind(this)}
          />
        </div>
        <ItemsBelowPost
          items={post.items}
          userID={this.props.userID}
          merchantID={this.props.merchantID}
          routerProps={this.props.routerProps}
          post={this.state.post}
        />
      </div>
    );
  }
}
