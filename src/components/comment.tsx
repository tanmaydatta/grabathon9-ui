import moment from "moment";
import * as React from "react";
import { Comment as CommentObj } from "../dto/dto";

export interface CommentProps {
  comment: CommentObj;
}

export default class Comment extends React.Component<CommentProps> {
  public render() {
    return (
      <div>
        <div className="Comment">
          <div className="ProfileImageContainer">
            <img
              className="ProfileImage"
              src="https://grab-discover.s3.ap-southeast-1.amazonaws.com/bb1be729c4df46e7ba224ce3c8901cc8/chicken-burger.jpeg"
              alt=""
            />
          </div>
          <div className="CommentContent">
            <span>
              <span className="UserName">{this.props.comment.userName}</span>{" "}
              {this.props.comment.content}
            </span>
            <div className="CommentTime">
              {moment(moment.utc(this.props.comment.datePosted).toDate())
                .local()
                .fromNow()}
            </div>
          </div>
        </div>
        <hr className="Separator"></hr>
      </div>
    );
  }
}
