import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Home from "./views/Home";
import Product from "./views/Product";
import "./styles.css";
import { Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Container className="pt-4">
        <Link to="/">Home</Link>
      </Container>
      <div className="mt-5 pt-5">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={Product} />
        </Switch>
      </div>
    </>
  );
}

export default App;
