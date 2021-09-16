import * as React from "react";
import { RouterProps } from "react-router-dom";
import "../css/App.css";
import MerchantService from "../services/MerchantService";
import Post from "./post";
import "../css/postPage.css";
import { GetPostRes } from "../dto/dto";

interface PostPageProps {
  postID: string;
  merchantID: string;
  routerProps: RouterProps;
}

interface PostPageState {
  loading: boolean;
  success: boolean;
  post: GetPostRes;
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
      post: {
        mediaType: "",
        mediaURL: "",
        logoUrl: "",
        title: "",
        merchantName: "",
        datePosted: new Date(),
        postID: 0,
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
      <div className="App App-header">
        <div hidden={!state.loading}>Loading ...</div>
        <div hidden={state.loading || state.success}>
          Error occurred. Check console
        </div>
        <div className="PostPage" hidden={state.loading || !state.success}>
          <Post
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
      </div>
    );
  }
}
