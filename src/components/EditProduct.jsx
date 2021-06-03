import React from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { Formik } from "formik";
import createProductSchema from "../validationSchemas/createProductSchema";

export default function EditProduct({
  show,
  handleFormSubmit,
  onHide,
  product,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={createProductSchema}
          initialValues={product}
          onSubmit={(values, actions) => {
            handleFormSubmit(values);
            console.log("hello formik");
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                {props.errors.productName && (
                  <Alert variant="danger">{props.errors.productName}</Alert>
                )}
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="productName"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.productName}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Short Description</Form.Label>
                {props.errors.description && (
                  <Alert variant="danger">{props.errors.description}</Alert>
                )}
                <Form.Control
                  type="text"
                  as="textarea"
                  placeholder="Enter description"
                  name="description"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.description}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image Url</Form.Label>
                {props.errors.imageUrl && (
                  <Alert variant="danger">{props.errors.imageUrl}</Alert>
                )}
                <Form.Control
                  type="text"
                  placeholder="Enter url of product's image"
                  name="imageUrl"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.imageUrl}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Count</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="enter product's amount"
                  name="count"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.count}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                {props.errors.color && (
                  <Alert variant="danger">{props.errors.color}</Alert>
                )}
                <Form.Control
                  type="text"
                  placeholder="enter product's color"
                  name="color"
                  value={props.values.color}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="enter product's weight"
                  name="weight"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.weight}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Height</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="enter product's height"
                  name="height"
                  value={props.values.height}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Width</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="enter product's width"
                  name="width"
                  value={props.values.width}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mr-2">
                Submit
              </Button>
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

EditProduct.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  handleFormSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
  product: PropTypes.object,
};
