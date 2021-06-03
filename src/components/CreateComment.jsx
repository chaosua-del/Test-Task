import React from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import { Formik } from "formik";
import createCommentSchema from "../validationSchemas/createCommentSchema";

// function which creates new Comment, receives boolean show, and two functions
export default function CreateComment({ show, handleFormSubmit, onHide }) {
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
          Leave Comment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ commentText: "" }}
          validationSchema={createCommentSchema}
          onSubmit={(values, actions) => {
            handleFormSubmit(values);
            console.log("hello formik");
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Leave comment</Form.Label>
                {props.errors.commentText && (
                  <Alert variant="danger">{props.errors.commentText}</Alert>
                )}
                <Form.Control
                  type="text"
                  as="textarea"
                  placeholder="Enter your comment"
                  name="commentText"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.commentText}
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

CreateComment.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  handleFormSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
  text: PropTypes.string,
};
