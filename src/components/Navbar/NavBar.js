import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
export default class NavBar extends Component {
  render() {
    return (
      <Navbar
        bg="light"
        variant="light"
        className="shadowCard fixed-top flex-md-nowrap customBackground customNav"
        style={{
          //backgroundColor: "#e84118",
          height: "40px",
          position: "relative",
        }}
      >
        <Navbar.Brand>
          <strong style={{ fontSize: "0.9rem" }}>
            Usuario: {this.props.user.userName}
          </strong>

          {/* <Image
            className=" p-0 m-0 d-inline-block align-top"
            src="/img/alerti.png"
            rounded
            fluid
            style={{
              width: "100px",
              backgroundColor: "rgba(240, 255, 255, 0.555)",
            }}
          ></Image> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Navbar.Text style={{ fontSize: "0.9rem" }}>
            <strong>wikiDrive</strong>
          </Navbar.Text>
        </Navbar.Collapse>
        <Button
          className="ml-2"
          variant="danger"
          style={{
            fontSize: "11px",
            paddingTop: "2px",
            paddingBottom: "2px",
          }}
          onClick={() => {
            this.props.signoutFunction();
            sessionStorage.clear();
          }}
        >
          Cerrar Sesión
        </Button>

        <Navbar.Text className="ml-3"></Navbar.Text>
      </Navbar>
    );
  }
}
