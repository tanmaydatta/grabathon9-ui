import * as React from "react";
import { RouterProps } from "react-router-dom";
import mex_entry_home from "../assets/images/mex_entry_home.jpg";

export interface MexEntryHomeProps {
  routerProps: RouterProps;
  merchantID: string;
}

export default class MexEntryHome extends React.Component<MexEntryHomeProps> {
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
            `/merchant/${this.props.merchantID}/overview`
          );
        }}
        alt="mex_entry_home"
        src={mex_entry_home}
      />
      //   </div>
    );
  }
}
