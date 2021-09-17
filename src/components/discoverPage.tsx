import * as React from "react";
import { RouterProps } from "react-router-dom";
import { GetPostRes } from "../dto/dto";
import MerchantService from "../services/MerchantService";
import DiscoverPost from "./discoverPost";
import "../css/postsPage.css";
import ItemsBelowPost from "./itemsBelowPost";

interface DiscoverPageState {
  loading: boolean;
  success: boolean;
  posts: GetPostRes[];
  postIndex: number;
}

interface DiscoverPageProps {
  routerProps: RouterProps;
  userID: string;
}

export default class DiscoverPage extends React.Component<
  DiscoverPageProps,
  DiscoverPageState
> {
  constructor(props: DiscoverPageProps) {
    super(props);
    this.state = {
      success: true,
      loading: true,
      posts: [],
      postIndex: 0,
    };
  }

  onLike(postIndex: number) {
    let post = this.state.posts[postIndex];
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
        let posts = [...this.state.posts];
        post.isLiked = res.isLiked;
        post.likes = res.likes;
        posts[postIndex] = post;
        this.setState({
          ...this.state,
          posts: posts,
        });
      })
      .catch((e) => {
        alert("Not able to like post!");
      });
  }

  componentDidMount() {
    MerchantService.discover({
      userID: this.props.userID,
    })
      .then((resp) => {
        console.log("setting state in success", resp);
        this.setState({
          ...this.state,
          success: true,
          loading: false,
          posts: resp.posts,
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
  public render() {
    const state = this.state;
    return (
      <div className="App PostsWrapper">
        {state.loading && <div>Loading ...</div>}
        {!this.state.loading && !state.success && (
          <div>Error occurred. Check console</div>
        )}
        {!state.loading &&
          state.success &&
          state.posts.map((post, i) => {
            return (
              <div key={i}>
                <div className="PostCard">
                  <DiscoverPost
                    postIndex={i}
                    userID={this.props.userID}
                    likes={post.likes}
                    key={post.mediaURL}
                    mediaType={post.mediaType}
                    logoURL={post.logoUrl}
                    merchantName={post.merchantName}
                    mediaURL={post.mediaURL}
                    date={post.datePosted}
                    postID={post.postID}
                    title={post.title}
                    merchantID={
                      post.merchantID ? post.merchantID.toString() : ""
                    }
                    routerProps={this.props.routerProps}
                    boosted={post.boosted}
                    comments={post.comments}
                    isLiked={post.isLiked}
                    onLike={this.onLike.bind(this)}
                  />
                </div>
                <ItemsBelowPost
                  merchantID={post.merchantID?.toString()}
                  userID={this.props.userID}
                  key={`menuitem${i}`}
                  items={post.items}
                  routerProps={this.props.routerProps}
                />
              </div>
            );
          })}
      </div>
    );
  }
}
