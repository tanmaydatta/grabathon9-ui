import * as React from "react";
import { RouterProps } from "react-router-dom";
import overview from "../assets/images/overview.png";

export interface MexEntryOverviewProps {
  routerProps: RouterProps;
  merchantID: string;
}

export default class MexEntryOverview extends React.Component<MexEntryOverviewProps> {
  public render() {
    return (
      //   <div>
      <img
        alt={this.props.merchantID}
        style={{
          width: "100%",
          height: "100vh",
        }}
        onClick={() => {
          this.props.routerProps.history.push(
            `/merchant/${this.props.merchantID}/create`
          );
        }}
        src={overview}
      />
      //   </div>
    );
  }
}
