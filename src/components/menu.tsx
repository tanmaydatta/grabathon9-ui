import moment from "moment";
import * as React from "react";
import ReactPlayer from "react-player";
import "../css/post.css";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { RouterProps } from "react-router-dom";

export interface MenuProps {
  mediaURL: string;
  id: number;
  name: string;
  routerProps: RouterProps;
  merchantID: string;
}

export default class Menu extends React.Component<MenuProps> {
  public render() {
    return (
      <div className="Post">
        <div className="PostMeta">
          <div className="MerchantNameWrapper">
            <div className="LogoImageWrapper">
              <img
                src={this.props.mediaURL}
                className="LogoImage"
                alt={this.props.mediaURL}
              />
            </div>
            <div className="MerchantName">
              <div style={{ textAlign: "left" }}>{this.props.name}</div>
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
                  <div style={{ textAlign: "left" }}>12 SGD</div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
