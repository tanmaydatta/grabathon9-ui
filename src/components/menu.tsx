import * as React from "react";
import "../css/post.css";
import { RouterProps } from "react-router-dom";
import { GetItemRes } from "../dto/dto";
import { TiTick } from "react-icons/ti";

export interface MenuProps {
  routerProps: RouterProps;
  item: GetItemRes;
  selected: boolean;
  userID: string;
}

export interface MenuState {
  selected: boolean;
}

export default class Menu extends React.Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);
    this.state = {
      selected: this.props.selected,
    };
  }
  public render() {
    const item = this.props.item;
    return (
      <div
        className="Post"
        onClick={() => {
          const val = !this.state.selected && !(this.props.userID.length === 0);
          this.setState({
            ...this.state,
            selected: val,
          });
        }}
      >
        <div className="PostMeta">
          <div className="MerchantNameWrapper">
            <div className="LogoImageWrapper">
              <img
                src={item.mediaURL}
                className="MenuImage"
                alt={item.mediaURL}
              />
            </div>
            <div className="MerchantName">
              <div style={{ textAlign: "left" }}>{item.name}</div>
              <div className="PostDate">
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div style={{ textAlign: "left" }}>{item.description}</div>{" "}
                </div>
              </div>
              <div
                style={{
                  fontSize:
                    "calc(12px + (24 - 16) * (100vw - 400px) / (800 - 400))",
                }}
              >
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div style={{ textAlign: "left" }}>
                    {item.price} {item.currency}
                  </div>{" "}
                </div>
              </div>
            </div>
            {this.state.selected && (
              <div className="orderTickContainer">
                <TiTick
                  color="green"
                  size="calc( 100px + (24 - 16) * (100vw - 400px) / (800 - 400) )"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
