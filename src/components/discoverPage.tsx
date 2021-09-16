import * as React from "react";
import { RouterProps } from "react-router-dom";
import { GetPostRes } from "../dto/dto";
import MerchantService from "../services/MerchantService";
import DiscoverPost from "./discoverPost";
import "../css/postsPage.css";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Menu from "./menu";

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
      <div className="App PostsWrapper">
        {state.loading && <div>Loading ...</div>}
        {!this.state.loading && !state.success && (
          <div>Error occurred. Check console</div>
        )}
        {!state.loading &&
          state.success &&
          state.posts.map((post, i) => {
            return (
              <div>
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
                    merchantID={post.merchantID ? post.merchantID : 0}
                    routerProps={this.props.routerProps}
                  />
                </div>
                <div key={`menuitem${i}`}>
                  <ScrollMenu LeftArrow={{}} RightArrow={{}}>
                    <div
                      style={{
                        width: "80vw",
                        marginLeft: "1%",
                      }}
                      className="PostCard"
                    >
                      <Menu
                        routerProps={this.props.routerProps}
                        item={{
                          currency: "SGD",
                          id: 1,
                          mediaURL:
                            "https://grab-discover.s3.ap-southeast-1.amazonaws.com/fc9b49aa19f746189a565d61e2d487ce/cheese-burger.jpeg",
                          name: "cheese burger",
                          price: 10,
                        }}
                      />
                    </div>
                    <div
                      className="PostCard"
                      style={{
                        width: "80vw",
                        marginLeft: "1%",
                      }}
                    >
                      <Menu
                        routerProps={this.props.routerProps}
                        item={{
                          currency: "SGD",
                          id: 1,
                          mediaURL:
                            "https://grab-discover.s3.ap-southeast-1.amazonaws.com/fc9b49aa19f746189a565d61e2d487ce/cheese-burger.jpeg",
                          name: "cheese burger",
                          price: 10,
                        }}
                      />
                    </div>
                  </ScrollMenu>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
