import React from "react";
import logo from "./logo.svg";
import "./App.css";

const onClick = () => window.print();

function App() {
  return (
    <>
      <p>ECAPT0208</p>
      <p>PO: 24358</p>
      <p>QTY: 12000</p>
      <p>21/2/23</p>
      <p>D-14</p>
      <button onClick={onClick}>print</button>
    </>
  );
}

export default App;
