import React from "react";
import DashAnalytics from "./chart";
import LoadingWrapper from "../../components/loading/LoadingWrapper";

export default function HomePage() {
  return (
    <React.Fragment>
      <LoadingWrapper>
        <DashAnalytics />
      </LoadingWrapper>
    </React.Fragment>
  );
}
