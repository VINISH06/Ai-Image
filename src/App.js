import React, { useState, useRef, useCallback } from "react";
import { GiArtificialIntelligence } from "react-icons/gi";
import img from "../src/Assets/AI.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Card, Spinner } from "react-bootstrap";
import Prompt from "./Prompt";

function App() {
  const [img_url, setImg_url] = useState("/");
  const [loading, setLoading] = useState(false);

  let inputref = useRef(null);

  const debouncedImageGenerator = useCallback(
    debounce(async () => {
      setLoading(true);

      if (inputref.current.value === "") {
        setLoading(false);
        return 0;
      }

      const apiKey = "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";

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/images/generations",
          {
            prompt: inputref.current.value,
            n: 1,
            size: "512x512",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
              "User-Agent": "Chrome",
            },
          }
        );

        if (response.status === 200) {
          let data = response.data;
          setImg_url(data.data[0].url);
          console.log(data);
        } else {
          console.error(`Error: ${response.status} - ${response.data}`);
        }
      } catch (err) {
        console.error("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    }, 200),
    []
  );

  function debounce(func, delay) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container
          fluid
          className="d-flex align-items-center justify-content-center min-vh-100"
        >
          <Card className="img-container" style={{ maxWidth: "400px" }}>
            <h1 className="text-center text-dark">
              Image-
              <span className="text-info">
                Generator_
                <GiArtificialIntelligence />
              </span>
            </h1>
            <Card.Img
              src={img_url === "/" ? img : img_url}
              alt="img"
              className="img-fluid shadow rounded"
            />
            <Card.Body>
              <Prompt
                imageGenerator={debouncedImageGenerator}
                inputref={inputref}
              />
              {loading && (
                <p className="text-primary">
                  <Spinner animation="border" size="sm" /> Loading...
                </p>
              )}
            </Card.Body>
          </Card>
        </Container>
      </header>
    </div>
  );
}

export default App;
