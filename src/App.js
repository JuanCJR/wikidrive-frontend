import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signin from "./components/User/Signin";
import Home from "./components/Home";
import NavBar from "./components/Navbar/NavBar";
import UserService from "./services/UserService";
export default class App extends Component {
  state = {
    pageState: "signin",
    user: {},
    userService: new UserService(),
  };

  async componentDidMount() {
    
    let pageState = "";
    let user = {};
    if (sessionStorage.getItem("isLoggedIn")) {
      pageState = "home";
      user = await this.state.userService.reconectUser(
        sessionStorage.getItem("_id")
      );
    } else {
      pageState = "signin";
    }

    this.setState({
      user: user,
      pageState: pageState,
      isLoggedIn: true,
    });
  }

  render() {
    return (
      <this.renderPages
        pageState={this.state.pageState}
        signoutFunction={this.signoutFunction}
        signinFunction={this.signinFunction}
        user={this.state.user}

      />
    );
  }

  //Controlador de renderizado de pagina de inicio
  renderPages = (props) => {
    const { signinFunction, pageState, signoutFunction,user } = props;

    switch (pageState) {
      case "signin":
        return <Signin signinFunction={signinFunction} />;
      case "home":
        return (
          <React.Fragment>
            <NavBar
             signoutFunction={signoutFunction} user={user}/>
            <Home user={user}/>
          </React.Fragment>
        );
      default:
        return <Signin signinFunction={signinFunction} />;
    }
  };

  signinFunction = (user) => {
    sessionStorage.setItem("isLoggedIn", true);
    sessionStorage.setItem("_id", user._id);
    this.setState({
      pageState: "home",
      user:user
    });
  };

  signoutFunction = () => {
    sessionStorage.clear();
    this.setState({
      pageState: "signin",
      user: {},
      isLoggedIn: false,
    });
  };
}
