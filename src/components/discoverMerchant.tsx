import * as React from "react";
import { RouterProps } from "react-router-dom";
import { GetMerchantRes, GetPostRes } from "../dto/dto";
import MerchantService from "../services/MerchantService";
import TabBar from "./tabBar";
import DiscoverPost from "./discoverPost";
import ItemsBelowPost from "./itemsBelowPost";

interface DiscoverMerchantState {
  loading: boolean;
  success: boolean;
  posts: GetPostRes[];
  merchant?: GetMerchantRes;
  postIndex: number;
}

interface DiscoverMerchantProps {
  merchantID: string;
  userID: string;
  routerProps: RouterProps;
}

export default class DiscoverMerchant extends React.Component<
  DiscoverMerchantProps,
  DiscoverMerchantState
> {
  constructor(props: DiscoverMerchantProps) {
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
    MerchantService.getMerchant({
      id: Number(this.props.merchantID),
    })
      .then((resp) => {
        this.setState({
          ...this.state,
          merchant: resp,
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
    MerchantService.getPosts({
      merchantID: Number(this.props.merchantID),
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
        <img
          style={{
            maxHeight: "40vh",
            width: "99%",
            margin: "1% 0  0 0",
          }}
          src={this.state.merchant?.logoURL}
          alt={this.state.merchant?.logoURL}
        />

        <div
          style={{
            textAlign: "left",
            margin: "0 0 1% 1%",
            fontSize: "calc(20px + (24 - 16) * (100vw - 400px) / (800 - 400))",
            fontWeight: "bold",
          }}
        >
          {this.state.merchant?.name}
        </div>

        {!state.loading && state.success && (
          <TabBar
            routerProps={this.props.routerProps}
            onTabClick={[
              (routerProps) => {
                routerProps.history.push(
                  `/pax/${this.props.userID}/merchant/${this.props.merchantID}/menu`
                );
              },
              (routerProps) => {},
            ]}
            tabs={["Menu", "Discover"]}
            selected={1}
          />
        )}
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
                    merchantID={this.props.merchantID}
                    routerProps={this.props.routerProps}
                    boosted={post.boosted}
                    comments={post.comments}
                    isLiked={post.isLiked}
                    onLike={this.onLike.bind(this)}
                  />
                </div>
                <ItemsBelowPost
                  post={post}
                  merchantID={this.props.merchantID}
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
