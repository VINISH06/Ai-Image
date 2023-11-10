import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
const Prompt = ({ imageGenerator, inputref }) => {
  return (
    <div className="prompt">
      <InputGroup className="mb-3">
        <Form.Control
          aria-label="First name"
          placeholder="Prompt here..."
          ref={inputref}
        />
        <InputGroup.Text>
          <Button
            varient="btn"
            onClick={() => {
              imageGenerator();
            }}
          >
            Generate
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default Prompt;
