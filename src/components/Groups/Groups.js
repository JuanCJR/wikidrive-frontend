import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";
import GroupService from "../../services/GroupService";
export default class Groups extends Component {
  state = {
    groups: [],
    groupService: new GroupService(),
  };

  async componentDidMount() {
    const { groupService } = this.state;

    const groups = await groupService.getGroups();
    this.setState({
      groups: groups,
    });
  }

  //Funcion para refrescar lista de usaurios
  refreshList = async () => {
    const { groupService } = this.state;
    const groups = await groupService.getGroups();
    this.setState({
      groups: groups,
    });
  };

  render() {
    return (
      <Card className="shadowCard mt-2 pl-3 pr-3 cardHeight defaultFontSize">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-1 mb-1 border-bottom mt-2">
          <h3>Menú de Grupos de Usuario</h3>
        </div>

        <div className="tableContainer">
          <Table size="sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Miembros</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.groups.length ? (
                this.state.groups.map((g) => (
                  <tr key={g._id}>
                    <td>{g.groupName}</td>
                    <td>Miembros</td>
                    <td>opciones</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td></td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Boton de nuevo Grupo */}
      </Card>
    );
  }
}
