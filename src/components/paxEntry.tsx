import * as React from "react";
import { RouterProps } from "react-router-dom";
import pax_entry_home from "../assets/images/pax_entry_home.png";

export interface PaxEntryHomeProps {
  routerProps: RouterProps;
  userID: string;
}

export default class PaxEntryHome extends React.Component<PaxEntryHomeProps> {
  public render() {
    return (
      //   <div>
      <img
        style={{
          width: "100%",
          height: "100vh",
        }}
        onClick={() => {
          this.props.routerProps.history.push(
            `/pax/${this.props.userID}/discover`
          );
        }}
        alt="mex_entry_home"
        src={pax_entry_home}
      />
      //   </div>
    );
  }
}
