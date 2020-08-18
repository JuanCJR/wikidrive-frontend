import React, { Component } from "react";
import Button from "react-bootstrap/Button";

export default class SideBar extends Component {
  render() {
    return (
      <nav
        className="col-md-2 d-none d-md-block bg-light sidebar pl-0 pr-0"
        style={{ position: "fixed", width: "180px" }}
      >
        <div className="sidebar-sticky">
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-2 mt-1 mb-1 text-muted">
            <span style={{ fontSize: "12px", color: "#d2dae2" }}>Opciones</span>
          </h6>
          <ul className="nav flex-column mt-2">
            {this.props.user.type === "admin" ? (
              <React.Fragment>
                {/* Usuarios */}
                <li className="nav-item">
                  <img
                    className="pr-2 ml-2"
                    alt="dashboard-icon"
                    src="img/user.png"
                  ></img>
                  <Button
                    style={{
                      border: "0px",
                      fontSize: "inherit",
                      paddingLeft: "4px",
                      paddingRight: "4px",
                    }}
                    variant="outline-light"
                    onClick={() => {
                      this.props.changePage("users");
                    }}
                  >
                    Usuarios
                  </Button>
                </li>
                {/* Drive */}
                <li className="nav-item">
                  <img
                    className="pr-2 ml-2"
                    alt="dashboard-icon"
                    src="img/cloud.png"
                  ></img>
                  <Button
                    style={{
                      border: "0px",
                      fontSize: "inherit",
                      paddingLeft: "4px",
                      paddingRight: "4px",
                    }}
                    variant="outline-light"
                    onClick={() => {
                      this.props.changePage("drive-home");
                    }}
                  >
                    Drive
                  </Button>
                </li>
                {/* Recycle Bin */}
                <li className="nav-item">
                  <img
                    className="pr-2 ml-2"
                    alt="dashboard-icon"
                    src="img/recycle.png"
                  ></img>
                  <Button
                    style={{
                      border: "0px",
                      fontSize: "inherit",
                      paddingLeft: "4px",
                      paddingRight: "4px",
                    }}
                    variant="outline-light"
                    onClick={() => {
                      this.props.changePage("recycle-bin");
                    }}
                  >
                    Papelera
                  </Button>
                </li>
                {/* Grupos */}
                {/* <li className="nav-item">
                  <img
                    className="pr-2 ml-2"
                    alt="dashboard-icon"
                    src="img/group.png"
                  ></img>
                  <Button
                    style={{
                      border: "0px",
                      fontSize: "inherit",
                      paddingLeft: "4px",
                      paddingRight: "4px",
                    }}
                    variant="outline-light"
                    onClick={() => {
                      this.props.changePage("groups");
                    }}
                  >
                    Grupos
                  </Button>
                </li> */}
              </React.Fragment>
            ) : (
              <li className="nav-item">
                <img
                  className="pr-2 ml-2"
                  alt="dashboard-icon"
                  src="img/cloud.png"
                ></img>
                <Button
                  style={{
                    border: "0px",
                    fontSize: "inherit",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                  }}
                  variant="outline-light"
                  onClick={() => {
                    this.props.changePage("drive-home");
                  }}
                >
                  Drive
                </Button>
              </li>
            )}
          </ul>

          {/* <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span style={{ fontSize: "11px", color: "#d2dae2" }}>
              Almacenamiento
            </span>
          </h6>
          <ul className="nav flex-column mt-2">
           
          </ul> */}
        </div>
        {/* Footer */}
        <div style={{ width: "80%" }} className="footer">
          <img
            width="120"
            className=""
            alt="logo-wikiDrive"
            src="/img/clip-logobandera.png"
          ></img>
          <br></br>
          <p style={{ fontSize: "8px" }}>© Copyright 2019 Clip Tecnología </p>
        </div>
      </nav>
    );
  }
}
