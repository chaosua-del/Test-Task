import React from "react";
import { Form } from "react-bootstrap";

export default function SortProducts({ handleRadioChange }) {
  return (
    <Form.Group className="mb-3 d-flex w-50 justify-content-between">
      <Form.Label>Sort By</Form.Label>

      <Form.Check
        type="radio"
        label="Name"
        name="sortBy"
        id="formHorizontalRadios1"
        value="name"
        onChange={handleRadioChange}
      />
      <Form.Check
        type="radio"
        label="Count"
        name="sortBy"
        id="formHorizontalRadios2"
        value="count"
        onChange={handleRadioChange}
      />
    </Form.Group>
  );
}
