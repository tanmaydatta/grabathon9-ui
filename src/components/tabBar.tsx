import * as React from "react";
import { RouterProps } from "react-router-dom";

export interface TabBarProps {
  tabs: string[];
  selected: number;
  onTabClick: ((routerProps: RouterProps) => void)[];
  routerProps: RouterProps;
}

export default class TabBar extends React.Component<TabBarProps> {
  public render() {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "5vh",
          justifyContent: "center",
          //   alignItems: "center",
        }}
      >
        {this.props.tabs.map((tab: string, i: number) => {
          var color = i == this.props.selected ? "black" : "grey";
          return (
            <div
              key={i}
              style={{
                flex: 1,
                border: "black",
                borderStyle: "solid",
                borderWidth: "1px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: color,
              }}
              onClick={() => {
                this.props.onTabClick[i](this.props.routerProps);
              }}
            >
              {tab}
            </div>
          );
        })}
      </div>
    );
  }
}
