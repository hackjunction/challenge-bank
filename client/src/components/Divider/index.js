import React from "react";

const Divider = ({ size = 1 }) => {
  const s = `${size}rem`;
  return <div style={{ width: s, height: s }} />;
};

export default Divider;
