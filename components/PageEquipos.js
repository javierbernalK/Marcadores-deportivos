import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import { Component } from 'react';



export const url = 'http://localhost:9000/api/equipos'
export const field_id = '/equ_id/'


class PageEquipos extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    tipoModal: '',
    form: {
      equ_id: '',
      equi_nombre: '',
    }
  };

  peticionGet = () => {
    axios.get(url).then(response => {
      //console.log(response.data);
      this.setState({ data: response.data });
    }).catch(error => {
      console.log(error.message);
    });
  };

  peticionPost = async () => {
    delete this.state.form.equ_id; //esto borra el campo equi_nombre
    await axios.post(url, this.state.form).then((response) => {
      this.modalInsertar();
      this.peticionGet();
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionPut = () => {
    axios.put(url + field_id + this.state.form.equ_id, this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    }).catch(error => {
      console.log(error.message);
    });
  };

  peticionDelete = () => {
    axios.delete(url + field_id + this.state.form.equ_id).then(response => {
      this.modalEliminar();
      this.peticionGet();
    }).catch(error => {
      console.log(error.message);
    });
  };


  seleccionardepor = (depor) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        equ_id: depor.equ_id,
        equi_nombre: depor.equi_nombre,
      }
    });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  modalEliminar = () => {
    this.setState({ modalEliminar: !this.state.modalEliminar });
  };

  handleChange = async (e) => {
    e.persist(); /// y por eso debemos especificar persistencia
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value /// los nombres de los inputs deben ser iguales a los del arreglo
      }
    });
    console.log(this.state.form); /// probar por consola lo que se guarda
  };

  //se ejecuta cuando lo realiza
  componentDidMount() {
    this.peticionGet();
  }

  render() {

    const form = this.state.form;

    return (
      <div className="App">
        <br /><br /><br />
        <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar(); }}>Agregar equipo</button>
        <br /><br />
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Deporte</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(depor => {
              return (
                <tr>
                  <td>{depor.equ_id}</td>
                  <td>{depor.equi_nombre}</td>
                  <td><button className="btn btn-primary"><FontAwesomeIcon icon={faEdit} onClick={() => { this.seleccionardepor(depor); this.modalInsertar(); }} /></button>
                    {" "}
                    <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} onClick={() => { this.seleccionardepor(depor); this.modalEliminar(); }} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: 'block' }}>
          </ModalHeader>
          <ModalBody>
            <div>
              <label htmlFor="equ_id">Id</label>
              <input className="form-control" type="text" name="equ_id" id="equ_id" readOnly onChange={this.handleChange} value={form ? form.equ_id : this.state.data.length + 1}></input>
              <br />
              <label htmlFor="equi_nombre">Deporte</label>
              <input className="form1-control" type="text" name="equi_nombre" id="equi_nombre" onChange={this.handleChange} value={form ? form.equi_nombre : ''}></input>
              <br />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.tipoModal === 'insertar' ?
              <button className="btn btn-success" onClick={() => this.peticionPost()}>Insertar</button>
              :
              <button className="btn btn-success" onClick={() => this.peticionPut()}>Modificar</button>}
            <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            ¿Estas seguro que deseas eliminar?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Si</button>
            <button className="btn btn-success" onClick={() => this.modalEliminar()}>No</button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }


}

export default PageEquipos;