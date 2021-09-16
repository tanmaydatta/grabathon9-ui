import * as React from "react";
import { RouterProps } from "react-router-dom";
import { GetItemRes, GetMerchantRes } from "../dto/dto";
import MerchantService from "../services/MerchantService";
import Post from "./post";
import "../css/postsPage.css";
import Menu from "./menu";
import TabBar from "./tabBar";

interface MenuPageState {
  loading: boolean;
  success: boolean;
  posts: GetItemRes[];
  merchant?: GetMerchantRes;
}

interface MenuPageProps {
  merchantID: string;
  routerProps: RouterProps;
}

export default class MenuPage extends React.Component<
  MenuPageProps,
  MenuPageState
> {
  constructor(props: MenuPageProps) {
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
    MerchantService.getMenu({
      merchantID: Number(this.props.merchantID),
    })
      .then((resp) => {
        console.log("setting state in success", resp);
        this.setState({
          ...this.state,
          success: true,
          loading: false,
          posts: resp.items,
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
    const discoverClick = (routerProps: RouterProps) => {
      routerProps.history.push(`/merchant/${this.props.merchantID}/posts`);
    };
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
            onTabClick={[(routerProps) => {}, discoverClick]}
            tabs={["Menu", "Discover"]}
            selected={0}
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
              <div key={i} className="PostCard">
                <Menu
                  key={post.mediaURL}
                  routerProps={this.props.routerProps}
                  item={post}
                />
              </div>
            );
          })}
      </div>
    );
  }
}
