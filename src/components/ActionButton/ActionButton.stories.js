import React from "react";
import Button from "./ActionButton";

export default {
  title: "ActionButton",
  component: Button,
};

export const ActionButton = () => (
  <div style={{ margin: "1rem" }}>
    <small className="text-gray">
      Resize viewport to see how it looks on different screen sizes
    </small>
    <div style={{ display: "grid", placeContent: "center", height: "100vh" }}>
      <Button />
    </div>
  </div>
);
