import moment from "moment";
import * as React from "react";
import ReactPlayer from "react-player";
import "../css/post.css";
import { RouterProps } from "react-router-dom";

export interface PostProps {
  mediaURL: string;
  date: Date;
  postID: number;
  title: string;
  merchantName: string;
  logoURL: string;
  mediaType: string;
  routerProps: RouterProps;
  merchantID: string;
  boosted: boolean;
  onBoostClicked: () => void;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export interface PostState {}

export default class Post extends React.Component<PostProps, PostState> {
  constructor(props: PostProps) {
    super(props);
    this.setState({});
  }
  public render() {
    return (
      <div className="Post">
        <div className="PostMeta">
          <div className="MerchantNameWrapper">
            <div className="LogoImageWrapper">
              <img
                src={this.props.logoURL}
                className="LogoImage"
                alt={this.props.logoURL}
              />
            </div>
            <div className="MerchantName">
              <div style={{ textAlign: "left" }}>{this.props.title}</div>
              <div className="PostDate">
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  {moment(moment.utc(this.props.date).toDate())
                    .local()
                    .fromNow()}
                </div>
                {this.props.boosted && <div>Sponsored</div>}
              </div>
            </div>
            <div
              onClick={this.props.onBoostClicked}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "1%",
                fontWeight: "normal",
                fontSize:
                  "calc(12px + (24 - 16) * (100vw - 400px) / (800 - 400))",
              }}
            >
              <div className={this.props.boosted ? "Boosted" : "Boost"}>
                {this.props.boosted ? "Boosted" : "Boost Post"}
              </div>
            </div>
          </div>
        </div>
        {this.props.mediaType.startsWith("image") && (
          <img
            className="PostImage"
            src={this.props.mediaURL}
            onError={(e) => {
              console.log(e);
            }}
            onClick={() => {
              this.props.routerProps.history.push(
                `/merchant/${this.props.merchantID}/post/${this.props.postID}`
              );
            }}
            alt={this.props.mediaURL}
          />
        )}
        {!this.props.mediaType.startsWith("image") && (
          <div className="PostImage">
            <ReactPlayer
              controls={true}
              width="100%"
              height="100%"
              url={this.props.mediaURL}
              onError={(e) => {
                console.log(e);
              }}
            />
          </div>
        )}
        <div className="BelowPostMedia">
          <div style={{ flex: 1 }}>
            {this.props.likes} likes{"\u00A0\u00A0\u00A0"}
            {this.props.comments} comments
          </div>
          <div>10 orders placed</div>
        </div>
      </div>
    );
  }
}
