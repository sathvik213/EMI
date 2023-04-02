import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [emi, setEmi] = useState("");
  const [data, setData] = useState([]);

  const calculateEmi = () => {
    const r = rate / 1200; // rate in percentage
    const t = time * 12; // time in months
    const emi = ((principal * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1)).toFixed(2);
    setEmi(emi);
    return emi;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emiValue = calculateEmi();
    setData([...data, { principal, rate, time, emi: emiValue }]);
    setPrincipal("");
    setRate("");
    setTime("");
    setEmi("");
  };

  return (
    <div className="App">
      <h1>EMI Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="principal">Principal amount:</label>
          <input
            type="number"
            id="principal"
            className="form-control"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rate">Rate of interest:</label>
          <input
            type="number"
            id="rate"
            className="form-control"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time period (in years):</label>
          <input
            type="number"
            id="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Calculate EMI</button>
      </form>
      {emi && <p>Your monthly EMI is: {emi}</p>}
      {data.length > 0 && (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Principal</th>
              <th>Rate of interest</th>
              <th>Time period (in years)</th>
              <th>EMI</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.principal}</td>
                <td>{row.rate}</td>
                <td>{row.time}</td>
                <td>{row.emi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
