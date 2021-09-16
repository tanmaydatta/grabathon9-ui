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
        mediaType: "",
        mediaURL: "",
        logoUrl: "",
        title: "",
        merchantName: "",
        datePosted: new Date(),
        postID: 0,
        items: [],
        boosted: false,
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
          items={post.items}
          routerProps={this.props.routerProps}
        />
      </div>
    );
  }
}
