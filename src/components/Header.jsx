// Header.js
import React from 'react';

const Header = ({ title }) => {
  return <h1>{title ? title : "Default title"}</h1>;
};

export default Header;
