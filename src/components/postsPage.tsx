import * as React from "react";
import { RouterProps } from "react-router-dom";
import { GetMerchantRes, GetPostRes } from "../dto/dto";
import MerchantService from "../services/MerchantService";
import Post from "./post";
import "../css/postsPage.css";
import TabBar from "./tabBar";
import ItemsBelowPost from "./itemsBelowPost";

interface PostsPageState {
  loading: boolean;
  success: boolean;
  posts: GetPostRes[];
  merchant?: GetMerchantRes;
}

interface PostsPageProps {
  merchantID: string;
  routerProps: RouterProps;
}

export default class PostsPage extends React.Component<
  PostsPageProps,
  PostsPageState
> {
  constructor(props: PostsPageProps) {
    super(props);
    this.state = {
      success: true,
      loading: true,
      posts: [],
    };
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
        {!state.loading && state.success && (
          <TabBar
            routerProps={this.props.routerProps}
            onTabClick={[
              (routerProps) => {},
              (routerProps) => {},
              (routerProps) => {
                routerProps.history.push(
                  `/merchant/${this.props.merchantID}/posts`
                );
              },
            ]}
            tabs={["Overview", "Campaigns", "Posts"]}
            selected={2}
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
                  <Post
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
                  />
                </div>
                <ItemsBelowPost
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
