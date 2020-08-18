import React, { Component } from 'react'
import {Card,Table} from 'react-bootstrap'
export default class RecycleBin extends Component {
    render() {
        return (
            <Card className="shadowCard mt-2 pl-3 pr-3 cardHeight defaultFontSize">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-1 pb-1 mb-1 border-bottom mt-2">
              <h3>
                <img
                  className="pr-2 ml-2"
                  alt="dashboard-icon"
                  src="img/recycle_blue.png"
                ></img>
                Papelera
              </h3>
            </div>
            <div className="tableContainer scrollbar">
              <Table size="sm">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Propietario</th>
                    <th>Fecha de creación</th>
                    <th>Tamaño del Archivo</th>
                  </tr>
                </thead>
                <tbody>
                
                </tbody>
              </Table>
            </div>
          
          </Card>
      
        )
    }
}
