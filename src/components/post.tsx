import moment from "moment";
import * as React from "react";
import ReactPlayer from "react-player";
import "../css/post.css";
import { AiFillHeart } from "react-icons/ai";
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
              <p>{this.props.merchantName}</p>
            </div>
          </div>
          <div className="PostDateWrapper">
            <div className="PostDate">
              {moment(moment.utc(this.props.date).toDate()).local().fromNow()}
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
        <div className="BelowPostMedia">
          <div className="Actions">
            <AiFillHeart style={{ color: "#ed4956", margin: "1%" }} />
            <IoChatbubbleOutline style={{ margin: "1%" }} />
            <IoPaperPlaneOutline style={{ margin: "1%" }} />
          </div>
          <div className="PostTitle">
            {this.props.merchantName}:
            <span
              style={{
                marginLeft: "5px",
                fontWeight: 500,
              }}
            >
              {this.props.title}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
