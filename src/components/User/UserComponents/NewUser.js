import React, { Component, useState } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
export default class NewUser extends Component {
  render() {
    return (
      <this.newUserButton
        refreshList={this.props.refreshList}
        userService={this.props.userService}
      />
    );
  }

  newUserButton = (props) => {
    const { userService, refreshList } = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [state, changeState] = useState({
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      passwd: "",
      type: "",
    });
    const onSubmit = async () => {
      const userInfo = state;
      await userService.signup(userInfo);
      await refreshList();
    };
    //Handler para el cambio de tipo de usuario
    const onChangeType = (e) => {
      const type = e.target.value;
      changeState((state) => ({
        ...state,
        type,
      }));
    };
    //Handler para el cambio de contraseña
    const onChangePasswd = (e) => {
      const passwd = e.target.value;
      changeState((state) => ({
        ...state,
        passwd,
      }));
    };
    //Handler para el cambio de nombre de usuario
    const onChangeUserName = (e) => {
      const userName = e.target.value;
      changeState((state) => ({
        ...state,
        userName,
      }));
    };
    //Handler para el cambio de email
    const onChangeEmail = (e) => {
      const email = e.target.value;
      changeState((state) => ({
        ...state,
        email,
      }));
    };
    //Handler para el cambio de apellido
    const onChangeLastName = (e) => {
      const lastName = e.target.value;
      changeState((state) => ({
        ...state,
        lastName,
      }));
    };
    //Handler para el cambio de nombre
    const onChangeFirstName = (e) => {
      const firstName = e.target.value;
      changeState((state) => ({
        ...state,
        firstName,
      }));
    };
    return (
      <React.Fragment>
        <Button
          onClick={handleShow}
          variant="primary"
          className="text-center ml-auto"
          style={{ borderRadius: "80%", width: "4rem", height: "3.5rem" }}
        >
          <strong>+</strong>
        </Button>
        <Modal show={show} size="lg" onHide={handleClose}>
          <Form
            onSubmit={async (e) => {
              e.preventDefault();

              await onSubmit();
              handleClose();
            }}
          >
            <Modal.Header>
              <Modal.Title>Creación de nuevo usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Row>
                {/* Campo Nombre */}
                <Form.Group as={Col} onChange={onChangeFirstName}>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Ingresar mombre" />
                </Form.Group>
                {/* Campo Apellido */}
                <Form.Group as={Col} onChange={onChangeLastName}>
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control type="text" placeholder="Ingresar apellido" />
                </Form.Group>
                {/* Cammpo email */}
                <Form.Group as={Col} onChange={onChangeEmail}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Ingresar email" />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                {/* Campo Nombre de usuario */}
                <Form.Group as={Col} onChange={onChangeUserName}>
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar nombre de usuario"
                  />
                </Form.Group>
                {/* Ingresar tipo de usuario */}
                <Form.Group as={Col} onChange={onChangeType}>
                  <Form.Label>Tipo de usuario</Form.Label>
                  <Form.Control as="select">
                    <option></option>
                    <option value="user-drive">Usuario Drive</option>
                    <option value="admin">Administrador</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              {/* Campo Contraseña */}
              <Form.Group onChange={onChangePasswd}>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresar contraseña"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger">Cancelar</Button>
              <Button variant="outline-success" type="submit">
                Crear
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </React.Fragment>
    );
  };
}
