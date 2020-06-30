import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "./Navbar/SideBar";
import DriveHome from "./Drive/DriveHome";
import Users from "./User/Users";
import Groups from "./Groups/Groups";
export default class Home extends Component {
  state = {
    pageState: "drive-home",
  };

  componentDidMount() {
    if (sessionStorage.getItem("principalPage")) {
      this.setState({
        pageState: sessionStorage.getItem("principalPage"),
      });
    }
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row className="mr-0">
            <SideBar user={this.props.user} changePage={this.changePage} />
          </Row>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 p-0">
            <Container fluid className="pl-0">
              <Row>
                <Col className="p-0">
                  <this.renderPages
                    inicioSesion={this.inicioSesion}
                    pageState={this.state.pageState}
                    user={this.props.user}
                  />
                </Col>
              </Row>
            </Container>
          </main>
        </Container>
      </div>
    );
  }

  //Renderisado de paginas
  renderPages(props) {
    const { user } = props;
    switch (props.pageState) {
      case "drive-home":
        return <DriveHome user={user} />;
      case "users":
        return <Users />;
      case "groups":
        return <Groups />;
      default:
        return <div></div>;
    }
  }

  changePage = (page) => {
    sessionStorage.setItem("principalPage", page);
    this.setState({
      pageState: page,
    });
  }; //.
}
