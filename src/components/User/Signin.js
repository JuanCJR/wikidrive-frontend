import React, { Component, useState } from "react";
import {
  Button,
  Modal,
  Card,
  Row,
  Col,
  Container,
  Form,
} from "react-bootstrap";
import UserService from "../../services/UserService";
export default class Signin extends Component {
  state = {
    userService: new UserService(),
    userName: "",
    passwd: "",
  };

  //Handler para el cambio de usuario
  onChangeUser = (e) => {
    this.setState({
      userName: e.target.value,
    });
  };

  //Handler para el cambio de clave
  onChangePasswd = (e) => {
    this.setState({
      passwd: e.target.value,
    });
  };

  //submit pora el inicio de sesion
  onSubmit = async () => {
    const { userName, passwd, userService } = this.state;
    const userInfo = {
      userName,
      passwd,
    };
    const data = await userService.signin(userInfo);
    return data;
  };

  //Boton de inicio de sesion
  submitButton = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [state, changeState] = useState({
      message: "",
    });
    return (
      <React.Fragment>
        <Button
          className="w-100"
          variant="outline-primary"
          onClick={async () => {
            const data = await props.onSubmit();
            if (data.code === "user-false") {
              handleShow();
              changeState((state) => ({
                ...state,
                message: data.message,
              }));
            } else if (data.code === "passwd-false") {
              handleShow();
              changeState((state) => ({
                ...state,
                message: data.message,
              }));
            } else {
              props.signinFunction(data);
            }
          }}
        >
          Entrar
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Error en el inicio de sesión</Modal.Title>
          </Modal.Header>
          <Modal.Body>{state.message}</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  };

  render() {
    return (
      <Container>
        <Row className="mt-5">
          <Col>
            <Card className="shadowCard">
              <h3 className="mb-4 mt-2 mx-auto">Inicio de Sesión</h3>

              <Card.Body>
                {/* Formulario de inicio de sesion */}
                <Form>
                  {/* Nombre de usuario */}
                  <Form.Group controlId="txtName" onChange={this.onChangeUser}>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su nombre de usuario"
                      required
                    />
                  </Form.Group>

                  {/* Contraseña */}
                  <Form.Group
                    controlId="txtPasswd"
                    onChange={this.onChangePasswd}
                  >
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      required
                    ></Form.Control>
                  </Form.Group>
                  <this.submitButton
                    signinFunction={this.props.signinFunction}
                    onSubmit={this.onSubmit}
                  />
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
