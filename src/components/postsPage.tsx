import * as React from "react";
import { RouterProps } from "react-router-dom";
import { GetMerchantRes, GetPostRes } from "../dto/dto";
import MerchantService from "../services/MerchantService";
import Post from "./post";
import "../css/postsPage.css";
import TabBar from "./tabBar";
import Menu from "./menu";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

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
        <img
          style={{
            maxHeight: "40vh",
            width: "100%",
          }}
          src={this.state.merchant?.logoURL}
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
                  `/merchant/${this.props.merchantID}/menu`
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
              <div>
                <div key={i} className="PostCard">
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
