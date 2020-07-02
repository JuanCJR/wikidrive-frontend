import React, { Component, useState, useEffect } from "react";
import {
  Button,
  DropdownButton,
  Dropdown,
  Modal,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import UserService from "../../../services/UserService";
export default class NewObj extends Component {
  render() {
    return (
      <DropdownButton drop="up" className="ml-auto mt-2 mb-2" title="Nuevo">
        <this.newFileButton
          userName={this.props.user.userName}
          route={this.props.route}
          refreshList={this.props.refreshList}
          driverService={this.props.driverService}
        />
        <this.newDirButton
          userName={this.props.user.userName}
          route={this.props.route}
          refreshList={this.props.refreshList}
          driverService={this.props.driverService}
        />
      </DropdownButton>
    );
  }
  //Boton para nuevo directorio
  newDirButton = (props) => {
    const { route, driverService, refreshList,userName } = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const userService = new UserService();
    const [state, changeState] = useState({
      userList: [],
      dirName: "",
      type: "",
      message: "",
      users: [{ userName: "" }],
      groups: [{ groupName: "" }],
    });

    useEffect(() => {
      async function getUsers() {
        const users = await userService.getUsers();
        changeState((state) => ({
          ...state,
          userList: users,
        }));
      }
      getUsers();
    }, [userService, changeState]);
    //handler para agregar grupo al arreglo
    const pushGroup = () => {
      let groups = state.groups;
      groups.push({ groupName: "" });
      changeState((state) => ({
        ...state,
        groups,
      }));
    };

    //handler para agregar usuario al arreglo
    const pushUser = () => {
      let users = state.users;
      users.push({ userName: "" });
      changeState((state) => ({
        ...state,
        users,
      }));
    };
    //handler para grupos
    const onChangeGroup = (e, index) => {
      let groups = state.groups;
      groups[index].groupName = e.target.value;
      changeState((state) => ({
        ...state,
        groups,
      }));
    };

    //handler para usuarios
    const onChangeUser = (e, index) => {
      let users = state.users;
      users[index].userName = e.target.value;
      changeState((state) => ({
        ...state,
        users,
      }));
    };

    //hanlder para tipo de carpeta
    const onChangeDirType = (e) => {
      const type = e.target.value;
      changeState((state) => ({
        ...state,
        type: type,
      }));
    };
    //hanlder para cambio de nombre de carpeta
    const onChangeDirname = (e) => {
      const dirName = e.target.value;
      changeState((state) => ({
        ...state,
        dirName: dirName,
      }));
    };

    const onSubmit = async (e) => {
      e.preventDefault();

      const users = state.users.filter((u) => u.userName !== "");
      const groups = state.groups.filter((g) => g.groupName !== "");
      const objInfo = {
        dirName: state.dirName,
        route: route,
        userName:userName,
        authorizations: {
          type: state.type,
          users: users,
          groups: groups,
        },
      };

      const dirMsg = await driverService.createDir(objInfo);
      if (dirMsg.code === "EEXIST") {
        changeState((state) => ({
          ...state,
          message: "El nombre del directorio ya existe.",
        }));
      } else {
        await refreshList();
        changeState((state) => ({
          ...state,
          dirName: "",
        }));
        handleClose();
      }
    };

    return (
      <React.Fragment>
        <Dropdown.Item onClick={handleShow}>Carpeta</Dropdown.Item>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Form
            onSubmit={async (e) => {
              await onSubmit(e);
            }}
          >
            <Modal.Header>
              <Modal.Title>Nueva Carpeta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Campo nombre de directorio */}
              <Form.Group onChange={onChangeDirname}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingresar el nombre de la carptea"
                />
              </Form.Group>
              {/* Campo tipo de autorizacion */}
              <Form.Group onChange={onChangeDirType}>
                <Form.Label>Tipo de Carpeta</Form.Label>
                <Form.Control required as="select">
                  <option></option>
                  <option value="public">Pública</option>
                  <option value="private">Privada</option>
                </Form.Control>
              </Form.Group>

              {/* Valida tipo de autorizacion */}
              {state.type === "private" ? (
                <React.Fragment>
                  <Row>
                    <Col>
                      {/*Campo usuarios*/}
                      {state.users.map((u, index) => (
                        <Form.Group
                          onChange={(e) => onChangeUser(e, index)}
                          key={`user-${index}`}
                        >
                          <Form.Label>Usuario {index + 1}</Form.Label>
                          <Form.Control as="select">
                            <option></option>
                            {state.userList.map((s) => (
                              <option key={s._id}>{s.userName}</option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      ))}
                      {/* Boton para sumar un usuario */}
                      <Button onClick={pushUser}>Agregar Usuario</Button>
                    </Col>

                    <Col>
                      {/* Campo Grupo */}
                      {/* {state.groups.map((u, index) => (
                        <Form.Group
                          onChange={(e) => onChangeGroup(e, index)}
                          key={`user-${index}`}
                        >
                          <Form.Label>Grupo {index + 1} </Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                      ))} */}
                      {/* Boton para sumar un grupo */}
                      {/* <Button onClick={pushGroup}>Agregar Grupo</Button> */}
                    </Col>
                  </Row>
                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )}

              <h6>{state.message}</h6>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="outline-success" type="submit">
                Crear
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </React.Fragment>
    );
  };

  //Boton para nuevo archivo
  newFileButton = (props) => {
    const { route, driverService, refreshList, userName } = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const userService = new UserService();

    const [state, changeState] = useState({
      userList: [],
      newFile: "",
      message: "",
      type: "",
      users: [{ userName: "" }],
      groups: [{ groupName: "" }],
    });

    useEffect(() => {
      async function getUsers() {
        const users = await userService.getUsers();
        changeState((state) => ({
          ...state,
          userList: users,
        }));
      }
      getUsers();
    }, [userService, changeState]);

    //hanlder para cambio de archivo
    const onChangeFile = async (e) => {
      const newFile = e.target.files;
      changeState((state) => ({
        ...state,
        newFile: newFile,
      }));
    };
    //handler para agregar grupo al arreglo
    const pushGroup = () => {
      let groups = state.groups;
      groups.push({ groupName: "" });
      changeState((state) => ({
        ...state,
        groups,
      }));
    };

    //handler para agregar usuario al arreglo
    const pushUser = () => {
      let users = state.users;
      users.push({ userName: "" });
      changeState((state) => ({
        ...state,
        users,
      }));
    };
    //handler para grupos
    const onChangeGroup = (e, index) => {
      let groups = state.groups;
      groups[index].groupName = e.target.value;
      changeState((state) => ({
        ...state,
        groups,
      }));
    };

    //handler para usuarios
    const onChangeUser = (e, index) => {
      let users = state.users;
      users[index].userName = e.target.value;
      changeState((state) => ({
        ...state,
        users,
      }));
    };

    //hanlder para tipo de carpeta
    const onChangeFileType = (e) => {
      const type = e.target.value;
      changeState((state) => ({
        ...state,
        type: type,
      }));
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      const users = state.users.filter((u) => u.userName !== "");
      const groups = state.groups.filter((g) => g.groupName !== "");
      let formData = new FormData();
      formData.append("userName", userName);
      formData.append("route", route);
      formData.append("type", state.type);
      formData.append("users", JSON.stringify(users));
      formData.append("groups", JSON.stringify(groups));
      formData.append("newFile", state.newFile[0]);

      const fileMsg = await driverService.uploadFile(formData);
      if (fileMsg.code === "file-upload-false") {
        changeState((state) => ({
          ...state,
          message: fileMsg.message,
        }));
      } else {
        await refreshList();
        changeState((state) => ({
          ...state,
          newFile: "",
        }));
        handleClose();
      }
    };

    return (
      <React.Fragment>
        <Dropdown.Item onClick={handleShow}>Archivo</Dropdown.Item>
        <Modal show={show} size="lg" onHide={handleClose}>
          <Form
            onSubmit={async (e) => {
              await onSubmit(e);
            }}
          >
            <Modal.Header>
              <Modal.Title>Nuevo Archivo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Campo de archivo */}
              <Form.Group onChange={onChangeFile}>
                <Form.Label>Subir archivo</Form.Label>
                <Form.Control required name="txtArchivo" type="file" />
              </Form.Group>
              {/* Campo tipo de autorizacion */}
              <Form.Group onChange={onChangeFileType}>
                <Form.Label>Tipo de Archivo</Form.Label>
                <Form.Control required as="select">
                  <option></option>
                  <option value="public">Público</option>
                  <option value="private">Privado</option>
                </Form.Control>
              </Form.Group>

              {/* Valida tipo de autorizacion */}
              {state.type === "private" ? (
                <React.Fragment>
                  <Row>
                    <Col>
                      {/*Campo usuarios*/}
                      {state.users.map((u, index) => (
                        <Form.Group
                          onChange={(e) => onChangeUser(e, index)}
                          key={`user-${index}`}
                        >
                          <Form.Label>Usuario {index + 1}</Form.Label>
                          <Form.Control as="select">
                            <option></option>
                            {state.userList.map((s) => (
                              <option key={s._id}>{s.userName}</option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      ))}
                      {/* Boton para sumar un usuario */}
                      <Button onClick={pushUser}>Agregar Usuario</Button>
                    </Col>

                    <Col>
                      {/* Campo Grupo */}
                      {/* {state.groups.map((u, index) => (
                        <Form.Group
                          onChange={(e) => onChangeGroup(e, index)}
                          key={`user-${index}`}
                        >
                          <Form.Label>Grupo {index + 1} </Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                      ))} */}
                      {/* Boton para sumar un grupo */}
                      {/* <Button onClick={pushGroup}>Agregar Grupo</Button> */}
                    </Col>
                  </Row>
                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )}

              <h6>{state.message}</h6>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={handleClose}>
                Cancelar
              </Button>
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
