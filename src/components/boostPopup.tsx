import * as React from "react";

export interface BoostPopupProps {
  onBoost: () => void;
}

const boostPopup = (
  amount: string,
  onSubmit: () => void,
  onDaysChanged: (e: any) => void,
  onCancel: () => void
) => {
  return (
    <div className="Forward">
      <div
        style={{
          width: "90%",
          height: "70vh",
          backgroundColor: "aliceblue",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            // padding: "2vh 0 2vh 0",
            margin: "0 0 0 10%",
            textAlign: "left",
            width: "100%",
          }}
        >
          {amount}
        </div>
        <input
          onChange={(e) => {
            onDaysChanged(e);
          }}
          style={{
            width: "85%",
            height: "5vh",
            margin: "1%",
            padding: "1% 1% 1% 3%",
          }}
          placeholder="Enter number of days"
        ></input>
        <div
          style={{
            margin: "2% 1% 1% 1%",
            width: "90%",
            height: "5vh",
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div
            style={{
              flex: 1,
              //   height: "5vh",
              padding: "2vh 0 2vh 0",
              margin: "0 2vh 0 0",
              backgroundColor: "#d7d9db",
            }}
            onClick={onSubmit}
          >
            Boost Post
          </div>

          <div
            style={{
              flex: 1,
              padding: "2vh 0 2vh 0",
              backgroundColor: "#d7d9db",
            }}
            onClick={onCancel}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default boostPopup;
