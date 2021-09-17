import { RouterProps } from "react-router-dom";
import { GetMerchantRes, GetPostRes } from "../dto/dto";
import MerchantService from "../services/MerchantService";
import Post from "./post";
import "../css/postsPage.css";
import TabBar from "./tabBar";
import ItemsBelowPost from "./itemsBelowPost";
import boostPopup from "./boostPopup";
import React from "react";

interface PostsPageState {
  loading: boolean;
  success: boolean;
  posts: GetPostRes[];
  merchant?: GetMerchantRes;
  boostClicked: boolean;
  postIndex: number;
  days: string;
  amount: number;
  boostSuccess: boolean;
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
      boostClicked: false,
      postIndex: 0,
      days: "",
      amount: 0,
      boostSuccess: true,
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
      <div className="Container">
        <div className="App PostsWrapper Behind">
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
                      comments={post.comments}
                      likes={post.likes}
                      boosted={post.boosted}
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
                      isLiked={post.isLiked}
                      onBoostClicked={() => {
                        if (!post.boosted) {
                          this.setState({
                            ...this.state,
                            postIndex: i,
                            boostClicked: true,
                          });
                        }
                      }}
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
        {
          this.state.boostClicked &&
            boostPopup(
              this.state.boostSuccess
                ? `This will cost you ${this.state.amount.toFixed(5)} SGD`
                : `Some error occurred, please check console`,
              () => {
                const post = this.state.posts[this.state.postIndex];
                MerchantService.boostPost({
                  postID: post.postID,
                  days: Number(this.state.days),
                })
                  .then((res) => {
                    let posts = this.state.posts;
                    let post = posts[this.state.postIndex];
                    post.boosted = res.success;
                    posts[this.state.postIndex] = post;
                    this.setState({
                      ...this.state,
                      posts: posts,
                      boostClicked: false,
                    });
                  })
                  .catch(() => {
                    this.setState({
                      ...this.state,
                      boostSuccess: false,
                    });
                  });
              },
              (e) => {
                this.setState({
                  ...this.state,
                  days: e.target.value,
                  amount: e.target.value * 1.2,
                });
              },
              () => {
                this.setState({
                  ...this.state,
                  boostClicked: false,
                  boostSuccess: true,
                  amount: 0,
                });
              }
            )
          // <BoostPopup
          //   onBoost={() => {
          //     alert(this.state.posts[this.state.postIndex].title);
          //   }}
          // />
        }
      </div>
    );
  }
}
