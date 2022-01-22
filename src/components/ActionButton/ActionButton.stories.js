import React from "react";
import Button from "./ActionButton";

export default {
  title: "ActionButton",
  component: Button,
};

export const ActionButton = () => (
  <div style={{ display: "grid", placeContent: "center", height: "100vh" }}>
    <Button />
  </div>
);
