//ADAM BENCZE - 2022 October

import { Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  //Used for storing and displaying the actual number
  const [calc, setCalc] = useState("0");
  //Used for storing and displaying the actual result
  const [result, setResult] = useState("");
  //Used for tracking the possibility of using decimal point
  const [decimalpoint, setDecimalPoint] = useState(false);
  //Supported operators
  const ops = ['/', '*', '+', '-', '.'];
  //API server url (backend)
  const baseURL = "http://127.0.0.1:3001/";

  /**
   * It updates the display of the calculator, with a few input validation
   * @param {String} value The new character on the calculator 
   */
  const updateCalc = value => {
    console.log(decimalpoint)
    if (ops.includes(value) && calc == '' ||
      ops.includes(value) && ops.includes(calc.toString().slice(-1))) { return; }

    if ((calc + value).toString().length > 20) {
      return;
    }

    if (ops.includes(value) && decimalpoint && value != ".") {
      setDecimalPoint(false);
    }

    if (value == "." && decimalpoint) {
      return;
    }

    if (value == "." && !decimalpoint) {
      setDecimalPoint(true);
    }

    if (!ops.includes(value) && calc == "0") {
      setCalc(value);
      setResult(eval(value).toString());
    } else {
      if (ops.includes(value)) {
        setCalc(calc + value);
      } else {
        setCalc(calc + value);
        setResult(eval(calc + value).toString());
      }
    }
  }

  /**
   * If user presses the "equals (=)" button it calculates the actual input and rounds it to 4 digits decimal.
   */
  const calculate = () => {
    var calculatedResult = (Math.round(eval(calc) * 10000) / 10000).toString();
    if (calculatedResult.includes(".")) {
      setDecimalPoint(true);
    }
    setCalc(calculatedResult);
  }

  /**
   * It cleaers the display of the calulator and resets the storage.
   */
  const clear = () => {
    if (calc == '') {
      return;
    }
    setDecimalPoint(false);
    setCalc("0");
    setResult(0);
  }

  /**
   * It deletes last digit with a few input validation.
   * Checking for empty input, negative zero, last digit and decimal points.
   */
  const del = () => {
    if (calc == '') {
      return;
    }
    if (calc.length == 3 && calc[0] == "-" && calc[1] == "0") {
      clear();
      return;
    }
    if (calc.length == 1) {
      clear();
      return;
    }
    var containsPoint = false;
    var i = calc.length;
    console.log(calc);
    const lastDigit = calc.toString().slice(-1)
    if (lastDigit == ".") {
      setDecimalPoint(false);
    }
    if (ops.includes(lastDigit) && lastDigit != ".") {
      for (var i = calc.length; i > 0; i--) {
        if (ops.includes(calc[i - 2]) && calc[i - 2] != ".") break;
        if (calc[i - 2] == ".") {
          containsPoint = true;
          break;
        }
      }
      console.log(containsPoint);
      containsPoint ? setDecimalPoint(true) : setDecimalPoint(false);
    }
    const value = calc.toString().slice(0, -1);
    if (!isNaN(calc.toString().slice(calc.length - 2, calc.length - 1))) {
      setResult(eval(value).toString());
      setCalc(value);
    } else
      setCalc(value);
  }

  /**
   * Saving the actual result through API call, then display a message for one second.
   */
  const saveNumber = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ number: Math.round(result * 10000) / 10000 })
    };
    fetch(baseURL + "write", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCalc("SAVED!");
        setResult("");
        setTimeout(() => {
          setCalc(data.number);
          setResult(data.number);
        }, "1000")
      })
  }

  /**
   * Loading the number from the API call response, then display it on the calculator.
   */
  const loadNumber = () => {
    clear();
    fetch(baseURL + "read")
      .then((response) => response.json())
      .then((data) => {
        setCalc("LOADED!");
        setResult("");
        setTimeout(() => {
          setCalc(data.number);
          setResult(data.number);
          if (data.number.toString().includes('.')) {
            setDecimalPoint(true);
          }
        }, "1000")
      })
  }

  //Equals button Component
  const Equals = () => {
    return <button onClick={calculate} className="btn btn-primary letter-equals">=</button>;
  };

  //Cleaer button Component
  const Clear = () => {
    return <button onClick={clear} className="btn btn-primary letter-clear">C</button>;
  };

  //Delete button Component
  const Delete = () => {
    return <button onClick={del} className="btn btn-primary letter-delete">D</button>;
  };

  //Display button Component
  const Display = () => {
    return <div>
      <div className="display m-4 mb-1 px-3">{result ? <span style={{ fontWeight: "300" }}>({Math.round(result * 10000) / 10000})</span> : ''}&nbsp;{calc || 0}</div>
    </div>;
  };

  /**
   * Operation button Components
   * Create a map from operations, then generate HTML code from it.
   * @returns The HTML code of the operation buttons.
   */
  const Operations = () => {
    const operations = [
      { symbol: "+", letter: "add" },
      { symbol: "-", letter: "subtract" },
      { symbol: "*", letter: "multiply" },
      { symbol: "/", letter: "divide" }
    ];

    return (
      <>
        {operations.map(({ letter, symbol }) => (
          <button key={letter} onClick={() => updateCalc(symbol)} className={`btn btn-primary letter-${letter}`}>
            {symbol}
          </button>
        ))}
      </>
    );
  };

  /**
 * Number button Components
 * Create a map from numbers and decimal points, then generate HTML code from it.
 * @returns The HTML code of the number and decimal point buttons.
 */
  const Numbers = () => {
    const numbers = [
      { value: "0", letter: "zero" },
      { value: "1", letter: "one" },
      { value: "2", letter: "two" },
      { value: "3", letter: "three" },
      { value: "4", letter: "four" },
      { value: "5", letter: "five" },
      { value: "6", letter: "six" },
      { value: "7", letter: "seven" },
      { value: "8", letter: "eight" },
      { value: "9", letter: "nine" },
      { value: ".", letter: "decimal" }
    ];

    return (
      <>
        {numbers.map(({ value, letter }) => (
          <button key={value} onClick={() => updateCalc(value)} className={`btn btn-primary letter-${letter}`}>
            {value}
          </button>
        ))}
      </>
    );
  };

  //Markup with bootstrap library 
  return (
    <div className="homepage">
      <Container className="p-3">
        <Row>
          <Col className="text-center">
            <Col className="text-center">
              <h1 className="text-3 title-text m-0">SmartCalculator</h1>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <div className="calculator shadow-lg mx-auto my-3">
              <Display />
              <div class="buttons p-3">
                <Equals />
                <Clear />
                <Delete />
                <Numbers />
                <Operations />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="btn-save p-0">
            <Button onClick={saveNumber} className="btn-file btn-secondary">Save number</Button>
          </Col>
          <Col className="btn-load p-0">
            <Button onClick={loadNumber} className="btn-file btn-secondary">Load number</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
