import { Result } from "antd";
import React from "react";

export const NoMatch = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />
  );
};
