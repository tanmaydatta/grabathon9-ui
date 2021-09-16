import moment from "moment";
import * as React from "react";
import ReactPlayer from "react-player";
import "../css/post.css";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { RouterProps } from "react-router-dom";
import { GetItemRes } from "../dto/dto";

export interface MenuProps {
  routerProps: RouterProps;
  item: GetItemRes;
}

export default class Menu extends React.Component<MenuProps> {
  public render() {
    const item = this.props.item;
    return (
      <div className="Post">
        <div className="PostMeta">
          <div className="MerchantNameWrapper">
            <div className="LogoImageWrapper">
              <img
                src={item.mediaURL}
                className="LogoImage"
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
                  <div style={{ textAlign: "left" }}>
                    Some description about the item
                  </div>{" "}
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
          </div>
        </div>
      </div>
    );
  }
}
