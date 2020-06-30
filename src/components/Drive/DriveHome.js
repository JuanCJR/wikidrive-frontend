import React, { Component, useState } from "react";
import {
  Card,
  Table,
  Button,
  Breadcrumb,
  Dropdown,
  ButtonGroup,
  Modal,
  Form,
} from "react-bootstrap";
import NewObj from "./DriveComponents/NewObj";
import DriverService from "../../services/DriveService";
export default class DriveHome extends Component {
  state = {
    driverService: new DriverService(),
    route: "/Drive",
    objs: {},
    storedRoutes: [
      {
        name: "Drive",
        route: "/Drive",
      },
    ],
  };

  async componentDidMount() {
    const { driverService, route } = this.state;
    const { user } = this.props;
    const objs = await driverService.getDir(route, user.userName, user.type);

    //filtra por autorizacion

    this.setState({
      objs: objs,
    });
  }

  //Divisor de rutas y retorna breadcrum
  routesDivider = (props) => {
    const { route, driverService, storedRoutes } = props;
    const { user } = this.props;

    let routesArray = route.split("/");
    routesArray.shift();
    let dirs = [];
    routesArray.forEach((r) => {
      dirs.push(r);
    });

    //On click en cada item de breadcrumb
    const onClickItem = async (name) => {
      const route = storedRoutes.filter((s) => s.name === name);
      const objs = await driverService.getDir(
        route[0].route,
        user.userName,
        user.type
      );

      this.setState({
        route: route[0].route,
        objs: objs,
      });
    };

    return (
      <Breadcrumb>
        {dirs.map((r, index) => (
          <Breadcrumb.Item
            onClick={async () => {
              await onClickItem(r);
            }}
            key={`${index}-${r}`}
          >
            {r}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  };

  //objetos de Drive
  objDrive = (props) => {
    const {
      objs,
      route,
      driverService,
      storedRoutes,
      user,
      refreshList,
    } = props;

    const onClickObj = async (route, obj) => {
      if (obj.type === "dir") {
        const newObjs = await driverService.getDir(
          `${route}/${obj.name}`,
          user.userName,
          user.type
        );
        let routes = storedRoutes;
        const exists = storedRoutes.filter((s) => s.name === obj.name);
        if (!exists.length) {
          routes.push({
            name: obj.name,
            route: `${route}/${obj.name}`,
          });
        }
        this.setState({
          objs: newObjs,
          route: `${route}/${obj.name}`,
          storedRoutes: routes,
        });
      } else {
        await driverService.downloadFile(route, obj.name);
      }
    };

    return objs.map((o) => (
      <tr key={o.name}>
        <td colSpan="4">
          <Dropdown as={ButtonGroup} className="w-100">
            <Button
              onClick={async () => {
                await onClickObj(route, o);
              }}
              variant="outline-secondary"
              className="w-100 text-left border-0"
            >
              <img
                className="pr-2 ml-2"
                alt="dashboard-icon"
                src={o.type === "dir" ? "img/folder.png" : "img/file.png"}
              ></img>
              {o.name}
            </Button>
            <Dropdown.Toggle split variant="outline-secondary" />
            <Dropdown.Menu>
              {/* Boton renombrar */}
              <props.renameButton
                route={route}
                type={o.type}
                objName={o.name}
                driverService={driverService}
                refreshList={refreshList}
              />
              {/* Boton Eliminar */}
              <props.deleteButton
                route={route}
                type={o.type}
                objName={o.name}
                driverService={driverService}
                refreshList={refreshList}
              />
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    ));
  };
  //Boton para renombrar
  renameButton = (props) => {
    const {objName, driverService, route, refreshList } = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [state, changeState] = useState({
      newName: "",
    });

    const onSubmit = async () => {
      await driverService.changeName(route, state.newName, objName);
      await refreshList();
    };
    //handler para cambio de nombre
    const onChangeName = (e) => {
      const newName = e.target.value;
      changeState((state) => ({
        ...state,
        newName: newName,
      }));
    };

    return (
      <React.Fragment>
        <Dropdown.Item onClick={handleShow}>Renombrar</Dropdown.Item>
        <Modal show={show} onHide={handleClose}>
          <Form
            onSubmit={async (e) => {
              e.preventDefault();
              await onSubmit();
            }}
          >
            <Modal.Header>
              <Modal.Title>Renombrar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Campo Nuevo Nombre */}
              <Form.Group onChange={onChangeName}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" defaultValue={objName} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="outline-success">
                Cambiar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </React.Fragment>
    );
  };

  deleteButton = (props) => {
    const { type, objName, driverService, route, refreshList } = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [state, changeState] = useState({
      msg: "",
      btnState: false,
    });

    const onSubmit = async () => {
      if (type === "dir") {
        const result = await driverService.deleteSimpleDir(route, objName);
        if (result.code === "ENOTEMPTY") {
          changeState((state) => ({
            ...state,
            msg: "La carpeta no se puede eliminar porque no esta vacia.",
            btnState: true,
          }));
        }

        await refreshList();
      } else {
        const result = await driverService.deleteFile(route, objName);
        console.log(result);
        await refreshList();
      }
    };

    return (
      <React.Fragment>
        <Dropdown.Item onClick={handleShow}>Eliminar</Dropdown.Item>
        <Modal show={show} onHide={handleClose}>
          <Form
            onSubmit={async (e) => {
              e.preventDefault();
              await onSubmit();
            }}
          >
            <Modal.Header>
              <Modal.Title>Eliminar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Se eliminara{" "}
              {type === "dir" ? "la siguiente carpeta" : "el siguiente archivo"}{" "}
              "{objName}"<br></br>
              <h6>{state.msg}</h6>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-primary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                disabled={state.btnState}
                type="submit"
                variant="outline-danger"
              >
                Eliminar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </React.Fragment>
    );
  };

  refreshList = async () => {
    const { driverService, route } = this.state;
    const { user } = this.props;
    const objs = await driverService.getDir(route, user.userName, user.type);
    this.setState({
      objs: objs,
    });
  };

  render() {
    return (
      <Card className="shadowCard mt-2 pl-3 pr-3 cardHeight defaultFontSize">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-1 mb-1 border-bottom mt-2">
          <h3>Drive</h3>
        </div>
        <this.routesDivider
          user={this.props.user}
          storedRoutes={this.state.storedRoutes}
          driverService={this.state.driverService}
          route={this.state.route}
        />
        <div className="tableContainer scrollbar">
          <Table size="sm">
            <thead>
              <tr>
                <th colSpan="4">Nombre</th>
                {/* <th>Propietario</th>
                <th>Tamaño del Archivo</th> */}
              </tr>
            </thead>
            <tbody>
              {/* Objetos de drive */}
              {this.state.objs.length ? (
                <this.objDrive
                  refreshList={this.refreshList}
                  renameButton={this.renameButton}
                  deleteButton={this.deleteButton}
                  user={this.props.user}
                  driverService={this.state.driverService}
                  route={this.state.route}
                  storedRoutes={this.state.storedRoutes}
                  objs={this.state.objs}
                />
              ) : (
                <tr>
                  <td></td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <NewObj
          refreshList={this.refreshList}
          driverService={this.state.driverService}
          route={this.state.route}
        />
      </Card>
    );
  }
}
