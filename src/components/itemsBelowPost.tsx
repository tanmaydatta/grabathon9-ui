import * as React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { RouterProps } from "react-router-dom";
import { GetItemRes, GetPostRes } from "../dto/dto";
import Menu from "./menu";

export interface ItemsBelowPostProps {
  routerProps: RouterProps;
  items: GetItemRes[];
  userID: string;
  merchantID: string;
  post: GetPostRes;
}

export default class ItemsBelowPost extends React.Component<ItemsBelowPostProps> {
  public render() {
    const itemLength = this.props.items?.length;
    return (
      <div
        onClick={() => {
          this.props.routerProps.history.push({
            pathname: `/pax/${this.props.userID}/merchant/${this.props.merchantID}/menu`,
            state: {
              selected: true,
              post: this.props.post,
            },
          });
        }}
      >
        <ScrollMenu LeftArrow={{}} RightArrow={{}}>
          {this.props.items?.map((item, i) => {
            return (
              <div
                style={{
                  minWidth: itemLength > 1 ? "80vw" : "96vw",
                  marginLeft: "1%",
                }}
                className="PostCard"
                key={i}
              >
                <Menu
                  selected={false}
                  routerProps={this.props.routerProps}
                  item={item}
                />
              </div>
            );
          })}
        </ScrollMenu>
      </div>
    );
  }
}
