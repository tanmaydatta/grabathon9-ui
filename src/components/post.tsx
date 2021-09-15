import moment from "moment";
import * as React from "react";
import ReactPlayer from "react-player";
import "../css/post.css";
import { AiFillHeart, AiTwotoneCheckCircle } from "react-icons/ai";
import { IoChatbubbleOutline, IoPaperPlaneOutline } from "react-icons/io5";

export interface PostProps {
  mediaURL: string;
  date: Date;
  postID: number;
  title: string;
  merchantName: string;
  logoURL: string;
  mediaType: string;
}

export default class Post extends React.Component<PostProps> {
  public render() {
    return (
      <div className="Post">
        <div className="PostMeta">
          <div className="MerchantNameWrapper">
            <div className="LogoImageWrapper">
              <img src={this.props.logoURL} className="LogoImage" />
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
            alt=""
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
              // alt=""
            />
          </div>
        )}
      </div>
    );
  }
}
