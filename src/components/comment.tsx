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
              src={this.props.comment.profileURL}
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
