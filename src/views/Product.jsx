import React, { Component } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import config from "../config";
import axios from "axios";
import EditProduct from "../components/EditProduct";
import CommentsList from "../components/CommentsList";
import CreateComment from "../components/CreateComment";

export default class Product extends Component {
  state = {
    comments: [],
    createCommentShow: false,
    show: false,
    product: config.initialProduct,
  };

  // on Mount - receive product info by id which is passed from url , receive all comments by productId
  componentDidMount() {
    axios
      .get(`${config.api_url}product/id/${this.props.match.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          product: response.data,
        });
      });

    axios
      .get(`${config.api_url}comment/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          comments: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  // submiting form ,updating our product
  handleFormSubmit = (values) => {
    axios
      .put(`${config.api_url}product/${this.props.match.params.id}`, values)
      .catch((error) => console.log(error));
    this.setState({
      show: false,
      product: values,
    });
  };

  // closing modal
  handleCloseModal = () => {
    this.setState({
      show: false,
    });
  };

  // showing modal
  handleEditProduct = () => {
    this.setState({
      show: true,
    });
  };

  // showing createCommentModal
  handleNewComment = () => {
    this.setState({
      createCommentShow: true,
    });
  };

  // closing createCommentModal
  handleCloseCommentModal = () => {
    this.setState({
      createCommentShow: false,
    });
  };

  // deleting Comment by id
  handleDeleteComment = (id) => {
    axios
      .delete(`${config.api_url}comment/${id}`)
      .catch((err) => console.log(err));
    this.setState((prevState) => {
      return {
        comments: prevState.comments.filter((comment) => comment._id !== id),
      };
    });
  };

  // posting comment
  handleSubmitComment = (values) => {
    axios
      .post(`${config.api_url}/comment`, {
        text: values.commentText,
        productId: this.props.match.params.id,
      })
      .then((response) => {
        this.setState((prevState) => {
          return {
            comments: [response.data, ...prevState.comments],
            createCommentShow: false,
            commentText: "",
          };
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      productName,
      description,
      width,
      height,
      weight,
      color,
      count,
      imageUrl,
    } = this.state.product;
    const { show, comments, createCommentShow } = this.state;
    return (
      <Container>
        <Row>
          <Col xs="4">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={imageUrl} />
              <Card.Body>
                <Card.Title>{productName}</Card.Title>
                <Card.Text>
                  <p>Amount: {count}</p>
                  <h5>Description:</h5>
                  <p>{description}</p>
                  <p>Color: {color}</p>
                  <p>width: {width}</p>
                  <p>height: {height}</p>
                  <p>weight: {weight}</p>
                </Card.Text>
                <Button variant="secondary" onClick={this.handleEditProduct}>
                  Edit
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <div className="d-flex mb-4 align-items-center">
              <h4 className="mr-3">Comments</h4>
              <Button onClick={this.handleNewComment}>Leave Comment</Button>
            </div>
            {comments.length > 0 ? (
              <CommentsList
                data={comments}
                handleDeleteComment={this.handleDeleteComment}
              />
            ) : (
              <p>no comments yet</p>
            )}
          </Col>
        </Row>
        <EditProduct
          show={show}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
          product={this.state.product}
          onHide={this.handleCloseModal}
        />
        <CreateComment
          show={createCommentShow}
          onHide={this.handleCloseCommentModal}
          handleFormSubmit={this.handleSubmitComment}
        />
      </Container>
    );
  }
}
