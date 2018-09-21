import React from "react";
import ReactDOM from "react-dom";
import MonthPicker from "./MonthPicker.js";

import "./styles.css";
import "./MonthPicker.css";

function App() {
  const disableFrom = new Date();
  disableFrom.setYear(2018);
  disableFrom.setMonth(3);

  const disableTo = new Date();
  disableTo.setYear(2019);
  disableTo.setMonth(6);

  return (
    <div className="App">
      <MonthPicker
        disableFrom={disableFrom}
        disableTo={disableTo}
        onSelect={d => console.log(d)}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
