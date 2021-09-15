import * as React from "react";
import { RouterProps } from "react-router-dom";
import { GetPostRes } from "../dto/dto";
import MerchantService from "../services/MerchantService";
import DiscoverPost from "./discoverPost";
import "../css/postsPage.css";

interface DiscoverPageState {
  loading: boolean;
  success: boolean;
  posts: GetPostRes[];
}

interface DiscoverPageProps {
  routerProps: RouterProps;
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
    };
  }

  componentDidMount() {
    MerchantService.discover()
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
      <div className="App App-header PostsWrapper">
        {state.loading && <div>Loading ...</div>}
        {!this.state.loading && !state.success && (
          <div>Error occurred. Check console</div>
        )}
        {!state.loading &&
          state.success &&
          state.posts.map((post, i) => {
            return (
              <div key={i} className="PostCard">
                <DiscoverPost
                  key={post.mediaURL}
                  mediaType={post.mediaType}
                  logoURL={post.logoUrl}
                  merchantName={post.merchantName}
                  mediaURL={post.mediaURL}
                  date={post.datePosted}
                  postID={post.postID}
                  title={post.title}
                />
              </div>
            );
          })}
      </div>
    );
  }
}
