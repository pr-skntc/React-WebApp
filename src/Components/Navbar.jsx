import React from "react";
import reactLogo from "../assets/react.svg";

function Navbar() {
  return (
    <header>
      <div className="flex mr-auto gap-x-2 font-semibold text-2xl">
        <img src={reactLogo} alt="React Logo" />
        React : TODO List
      </div>
    </header>
  );
}

export default Navbar;
