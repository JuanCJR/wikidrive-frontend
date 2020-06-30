import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";
import UserService from "../../services/UserService";
import NewUser from "./UserComponents/NewUser";
export default class Users extends Component {
  state = {
    users: [],
    userService: new UserService(),
  };

  async componentDidMount() {
    const { userService } = this.state;

    const users = await userService.getUsers();
    this.setState({
      users: users,
    });
  }

  //Funcion para refrescar lista de usaurios
  refreshList = async () => {
    const { userService } = this.state;
    const users = await userService.getUsers();
    this.setState({
      users: users,
    });
  };

  render() {
    return (
      <Card className="shadowCard mt-2 pl-3 pr-3 cardHeight defaultFontSize">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-1 mb-1 border-bottom mt-2">
          <h3>Menú de Usuarios</h3>
        </div>

        <div className="tableContainer">
          <Table size="sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Nombre de Usuario</th>
                <th>Tipo de Usuario</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.length ? (
                this.state.users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.firstName}</td>
                    <td>{u.lastName}</td>
                    <td>{u.email}</td>
                    <td>{u.userName}</td>
                    <td>{u.type}</td>
                  </tr>
                ))
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </tbody>
          </Table>
        </div>

        {/* Boton de nuevo usuario */}
        <NewUser
          userService={this.state.userService}
          refreshList={this.refreshList}
        />
      </Card>
    );
  }
}
