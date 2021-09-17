import * as React from "react";
import Comment from "./comment";
import { Comment as CommentObj } from "../dto/dto";
import { RouterProps } from "react-router-dom";
import "../css/comments.css";
import MerchantService from "../services/MerchantService";

export interface CommentsProps {
  userID: string;
  postID: string;
  routerProps: RouterProps;
}

export interface CommentsState {
  items: CommentObj[];
}

export default class Comments extends React.Component<
  CommentsProps,
  CommentsState
> {
  constructor(props: CommentsProps) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    MerchantService.getComments({
      postID: Number(this.props.postID),
    })
      .then((res) => {
        this.setState({
          ...this.state,
          items: res.comments,
        });
      })
      .catch();
  }

  public render() {
    return (
      <div className="Comments">
        <div className="CommentsHeader">Comments</div>
        <div className="CommentsList">
          {this.state.items &&
            this.state.items.map((item) => {
              return <Comment comment={item} />;
            })}
        </div>
      </div>
    );
  }
}
