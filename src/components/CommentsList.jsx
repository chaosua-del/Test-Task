import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import PropTypes from "prop-types";

// function which receives data param as commentsArray and function to delete comment
export default function CommentsList({ data, handleDeleteComment }) {
  return (
    <div>
      <ListGroup>
        {data.map((comment) => {
          const date = `${new Date(
            comment.createdAt
          ).toLocaleDateString()} at ${new Date(
            comment.createdAt
          ).toLocaleTimeString()}`;
          return (
            <ListGroup.Item
              key={comment._id}
              className="d-flex align-item-center justify-content-between"
            >
              <span>{comment.text}</span>
              <div className="d-flex flex-column">
                <span className="text-muted">{date}</span>
                <Button
                  onClick={() => handleDeleteComment(comment._id)}
                  variant="danger"
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

CommentsList.propTypes = {
  data: PropTypes.array,
  handleDeleteComment: PropTypes.func,
};
