import * as React from "react";
import { RouterProps } from "react-router-dom";
import "../css/App.css";
import MerchantService from "../services/MerchantService";
import Post from "./post";
import "../css/postPage.css";
import { EmptyPost, GetPostRes } from "../dto/dto";
import ItemsBelowPost from "./itemsBelowPost";
import boostPopup from "./boostPopup";

interface PostPageProps {
  postID: string;
  merchantID: string;
  routerProps: RouterProps;
}

interface PostPageState {
  loading: boolean;
  success: boolean;
  post: GetPostRes;
  boostClicked: boolean;
  boostSuccess: boolean;
  amount: number;
  days: string;
}

export default class PostPage extends React.Component<
  PostPageProps,
  PostPageState
> {
  constructor(props: PostPageProps) {
    super(props);
    this.state = {
      loading: true,
      success: true,
      boostClicked: false,
      boostSuccess: true,
      amount: 0,
      days: "",
      post: {
        merchantID: 0,
        mediaType: "",
        boosted: false,
        mediaURL: "",
        logoUrl: "",
        title: "",
        merchantName: "",
        datePosted: new Date(),
        postID: 0,
        items: [],
        likes: 0,
        comments: 0,
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

  public render() {
    const state = this.state;
    const post = state.post;
    return (
      <div className="Container">
        <div className="App">
          <div hidden={!state.loading}>Loading ...</div>
          <div hidden={state.loading || state.success}>
            Error occurred. Check console
          </div>
          <div className="PostPage" hidden={state.loading || !state.success}>
            <Post
              comments={post.comments}
              likes={post.likes}
              boosted={post.boosted}
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
                    boostClicked: true,
                  });
                }
              }}
            />
          </div>
          <ItemsBelowPost
            items={post.items}
            routerProps={this.props.routerProps}
            merchantID={this.props.merchantID}
            userID={""}
            post={EmptyPost}
          />
        </div>
        {
          this.state.boostClicked &&
            boostPopup(
              this.state.boostSuccess
                ? `This will cost you ${this.state.amount} SGD`
                : `Some error occurred, please check console`,
              () => {
                MerchantService.boostPost({
                  postID: post.postID,
                  days: Number(this.state.days),
                })
                  .then((res) => {
                    let post = this.state.post;
                    post.boosted = res.success;
                    this.setState({
                      ...this.state,
                      post: post,
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
