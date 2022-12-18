import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import { Component } from 'react';



export const url = 'http://localhost:9000/api/deportes'
export const field_id = '/id_deporte/'




class PageDeportes extends Component {

  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    tipoModal: '',
    form: {
      id_deporte: '',
      dep_nombre: '',
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
    delete this.state.form.id_deporte; //esto borra el campo id_deporte
    await axios.post(url, this.state.form).then((response) => {
      this.modalInsertar();
      this.peticionGet();
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionPut = () => {
    axios.put(url + field_id + this.state.form.id_deporte, this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    }).catch(error => {
      console.log(error.message);
    });
  };

  peticionDelete = () => {
    axios.delete(url + field_id + this.state.form.id_deporte).then(response => {
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
        id_deporte: depor.id_deporte,
        dep_nombre: depor.dep_nombre,
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
        [e.target.name]: e.target.value /// los nombres de los imputs deben ser iguales a los del arreglo
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
        <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar(); }}>Agregar Deporte</button>
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
                  <td>{depor.id_deporte}</td>
                  <td>{depor.dep_nombre}</td>
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
              <label htmlFor="id_deporte">Id</label>
              <input className="form-control" type="text" name="id_deporte" id="id_deporte" readOnly onChange={this.handleChange} value={form ? form.id_deporte : this.state.data.length + 1}></input>
              <br />
              <label htmlFor="dep_nombre">Deporte</label>
              <input className="form1-control" type="text" name="dep_nombre" id="dep_nombre" onChange={this.handleChange} value={form ? form.dep_nombre : ''}></input>
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


export default PageDeportes;

