// Header.js
import React from "react";

const Header = ({ title }) => {
  return <h1 className="text-3xl font-bold underline">{title ? title : "Default title"}</h1>;
};

export default Header;
