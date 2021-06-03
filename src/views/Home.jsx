import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import { Container, Button, Modal } from "react-bootstrap";
import ProductsList from "../components/ProductsList";
import EditProduct from "../components/EditProduct";
import SortProducts from "../components/SortProducts";

export default class Home extends Component {
  state = {
    products: [],
    sortedProducts: [],
    sortBy: "",
    show: false,
    showDelete: false,
    deleteId: "",
  };

  // receiving all products from server and writing them in this.state.products
  componentDidMount() {
    axios
      .get(`${config.api_url}/product`)
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => console.log(error));
  }

  // onSubmit we posting our product on server. Receives values from Formik. After that adding response.data to state.
  handleFormSubmit = (values) => {
    axios
      .post(`${config.api_url}/product`, values)
      .then((response) => {
        this.handleCloseModal();
        this.setState((prevState) => {
          return {
            products: [response.data, ...prevState.products],
          };
        });
      })
      .catch((error) => console.log(error));
  };

  // setting show to true to show modal window
  handleNewProduct = () => {
    this.setState({ show: true });
  };

  // closing modal and cleaning up state
  handleCloseModal = () => {
    this.setState({
      show: false,
      showDelete: false,
      product: config.initialProduct,
    });
  };

  // showing delete product modal window and setting deleteId in state which is received from params
  handleShowDelete = (id) => {
    this.setState({
      showDelete: true,
      deleteId: id,
    });
  };

  // deleting Product by deleteId
  handleDeleteProduct = () => {
    axios
      .delete(`${config.api_url}/product/${this.state.deleteId}`)
      .then((response) => {
        console.log(response);

        this.setState((prevState) => {
          return {
            products: prevState.products.filter(
              (product) => product._id !== this.state.deleteId
            ),
            showDelete: false,
          };
        });
      })
      .catch((error) => console.log(error));
  };

  // handling radio change and calling sortProducts()
  handleRadioChange = (e) => {
    console.log(e.target);
    this.setState((prevState) => {
      return {
        sortBy: e.target.value,
      };
    });
    this.sortProducts(this.state.products, e.target.value);
  };

  // sorting array by name or by count depends on value
  sortProducts = (array, value) => {
    console.log(array);
    if (value === "name") {
      this.setState({
        products: array.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        ),
      });
    } else if (value === "count") {
      this.setState({
        products: array.sort((a, b) => b.count - a.count),
      });
    }
  };

  render() {
    const { show, showDelete, products } = this.state;

    return (
      <Container className="d-flex flex-column pb-5">
        <div className="d-flex align-items-center justify-content-between">
          <SortProducts
            handleRadioChange={this.handleRadioChange}
          ></SortProducts>
          <Button onClick={this.handleNewProduct}>New Product</Button>
        </div>
        <ProductsList
          data={products}
          onShowDelete={this.handleShowDelete}
        ></ProductsList>
        <EditProduct
          product={config.initialProduct}
          show={show}
          onHide={this.handleCloseModal}
          handleFormSubmit={this.handleFormSubmit}
        ></EditProduct>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showDelete}
          onHide={this.handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={this.handleDeleteProduct}>Yes</Button>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
