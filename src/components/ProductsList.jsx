import React from "react";
import { ListGroup, Button, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

// styles for product image
const styles = {
  productPhoto: {
    width: "300px",
    height: "200px",
    borderRadius: "5px",
    display: "flex",
    overflow: "hidden",
    backgroundColor: "grey",
    justifyContent: "center",
  },
  productImage: {
    objectFit: "cover",
  },
};

export default function ProductsList({ data, onShowDelete }) {
  return (
    <div className="pt-5">
      {data.length > 0 ? (
        <ListGroup>
          {data.map((product) => {
            return (
              <ListGroup.Item key={product._id}>
                <Row>
                  <Col xs="12" lg="4">
                    <div style={styles.productPhoto}>
                      <img
                        src={product.imageUrl}
                        style={styles.productImage}
                        alt="bad url"
                      />
                    </div>
                  </Col>
                  <Col xs="12" lg="6">
                    <h5>{product.productName}</h5>
                    <div>Amount: {product.count}</div>
                    <p>Description: {product.description}</p>
                    <Button
                      variant="danger"
                      onClick={() => {
                        onShowDelete(product._id);
                      }}
                    >
                      Delete
                    </Button>
                    <Link to={`/product/${product._id}`}>
                      <Button variant="secondary">Show Details</Button>
                    </Link>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <Alert variant="primary">No Products Yet</Alert>
      )}
    </div>
  );
}
