import * as React from "react";
import Comment from "./comment";
import { Comment as CommentObj } from "../dto/dto";
import { RouterProps } from "react-router-dom";
import "../css/comments.css";
import MerchantService from "../services/MerchantService";
import { AiOutlineSend } from "react-icons/ai";

export interface CommentsProps {
  userID: string;
  postID: string;
  routerProps: RouterProps;
}

export interface CommentsState {
  items: CommentObj[];
  comment: string;
}

export default class Comments extends React.Component<
  CommentsProps,
  CommentsState
> {
  constructor(props: CommentsProps) {
    super(props);
    this.state = {
      items: [],
      comment: "",
    };
    this.reloadComments.bind(this);
  }

  reloadComments() {
    MerchantService.getComments({
      postID: Number(this.props.postID),
    })
      .then((res) => {
        this.setState({
          ...this.state,
          items: res.comments,
          comment: "",
        });
      })
      .catch();
  }

  componentDidMount() {
    this.reloadComments();
  }

  onComment() {
    MerchantService.postComment({
      userID: Number(this.props.userID),
      postID: Number(this.props.postID),
      content: this.state.comment,
    }).then(() => {
      this.reloadComments();
    });
  }

  onType(e: any) {
    this.setState({
      ...this.state,
      comment: e.target.value,
    });
  }

  public render() {
    return (
      <div className="Comments">
        <div className="CommentsHeader">Comments</div>
        <div className="CommentsList">
          {this.state.items &&
            this.state.items.map((item, i) => {
              return <Comment key={i} comment={item} />;
            })}
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            width: "100%",
            position: "fixed",
            bottom: 0,
          }}
        >
          <input
            placeholder="Add a comment ..."
            value={this.state.comment}
            onChange={this.onType.bind(this)}
            style={{
              zIndex: 10,
              width: "72%",
              textAlign: "left",
              margin: "5% 0% 5% 5%",
              paddingLeft: "2%",
              paddingRight: "16%",
              height: "5vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <div
            style={{
              padding: "0 6% 0 0",
              position: "fixed",
              right: 2,
              bottom: 22,
              zIndex: 10,
            }}
            onClick={this.onComment.bind(this)}
          >
            <AiOutlineSend size={"10vw"} />
          </div>
        </div>
      </div>
    );
  }
}
