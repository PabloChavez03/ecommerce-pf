import React from "react";
import "./Loader.css"

export default function Loader () {
  return (
    <div>
    <div className="loading">Loading&#8230;</div>

    <div className="content"><h3>Aguarde una momento!</h3></div>
    </div>
  );
}