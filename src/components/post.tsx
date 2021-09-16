import moment from "moment";
import * as React from "react";
import ReactPlayer from "react-player";
import "../css/post.css";
import { AiTwotoneCheckCircle } from "react-icons/ai";
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
}

export default class Post extends React.Component<PostProps> {
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
                  <div style={{ textAlign: "left" }}>
                    {this.props.merchantName}
                  </div>{" "}
                  <div
                    style={{
                      marginLeft: "2%",
                      marginRight: "2%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <AiTwotoneCheckCircle
                      size={
                        "calc( 8px + (24 - 16) * (100vw - 400px) / (800 - 400) )"
                      }
                      style={{
                        color: "grey",
                      }}
                    />
                  </div>
                  {moment(moment.utc(this.props.date).toDate())
                    .local()
                    .fromNow()}
                </div>
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
          <div style={{ flex: 1 }}>5 likes{"\u00A0\u00A0\u00A0"}4 comments</div>
          <div>10 orders placed</div>
        </div>
      </div>
    );
  }
}
