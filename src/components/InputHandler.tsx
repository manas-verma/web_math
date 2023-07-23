import React, { useState, ChangeEvent } from "react";

const InputHandler: React.FC = () => {
  const [re, setRe] = useState<string>("1,2,3");
  const [im, setIm] = useState<string>("-1,0,4");
  const [resultRe, setResultRe] = useState<string>("<resultRe>");
  const [resultIm, setResultIm] = useState<string>("<resultIm>");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "re") {
      setRe(value);
    } else if (name === "im") {
      setIm(value);
    }
  };

  const handleButtonClick = () => {
    // Make the API call
    const format = (s: string) => s.replace(/ /g, "").split(",");
    const body = {
      re: format(re),
      im: format(im),
    };
    console.log(body);
    fetch("https://fft.fly.dev/post", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response here
        console.log("API Response:", data);
        setResultRe(JSON.stringify(data.re));
        setResultIm(JSON.stringify(data.im));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setResultRe("error");
      });
  };

  return (
    <div className="container">
      <h1>FFT</h1>
      <div className="input-field">
        <div className="row">
          <label className="col-6">Re: </label>
          <input
            type="text"
            name="re"
            title="Real"
            value={re}
            onChange={handleInputChange}
            placeholder="Enter text 1"
            className="border rounded p-2"
          />
        </div>
      </div>
      <div className="input-field">
        <div className="row">
          <label className="col-6">Im: </label>
          <input
            type="text"
            name="im"
            title="Imaginary"
            value={im}
            onChange={handleInputChange}
            placeholder="Enter text 2"
            className="border rounded p-2"
          />
        </div>
      </div>
      <div className="input-field">
        <button onClick={handleButtonClick} className="button">
          Make API Call
        </button>
      </div>
      <div className="resultRes">
        <p className="resultRe">Re: {resultRe}</p>
        <p className="resultIm">Im: {resultIm}</p>
      </div>
    </div>
  );
};

export default InputHandler;
