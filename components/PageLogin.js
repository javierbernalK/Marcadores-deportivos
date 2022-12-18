import React, { Component } from 'react'

import '../css/login.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import axios from 'axios'

import Cookies from 'universal-cookie'

const urlLogin = "http://localhost:9000/api/usuarios"


const cookies = new Cookies();


class PageLogin extends Component {
    state = {
        form: {
            username: '',
            password: ''
        }

    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form, //conserve los datos que ya trae
                [e.target.name]: e.target.value
            }
        })
        //console.log(this.state.form)
    }

    iniciarSesion = async () => {
        // esto es para validar que esten todos los campos email y contraseña
        let name = this.state.form.username
        let pwd = this.state.form.password
        if (name.length <= 0 || pwd.length <= 0) {
            alert('Se requieren todos los datos')
            return "Datos Vacios"
        }
        //aqui se entra si el email y la contraseña son correctos 
        // por medio de  urlLogin+"/"+name+"/"+pwd)
        await axios.get(urlLogin + "/" + name + "/" + pwd)
            .then(response => {
                //console.log(response.data)
                return response.data
            }).then(response => {
                if (response.length > 0) {
                    var resp = response[0] // para evitar llamados tan largos con corchetes
                    cookies.set("usu_id", resp.usu_id, { path: "/" })/// el path es para que se puedan acceder de cualquier pagina
                    cookies.set("usu_email", resp.usu_email, { path: "/" })// las cookies son unas variables que se van a utilizar en la aplicacion
                    //para saber que cada vez que se cambie de un componente a otro ellas vayan
                    //llevando y conservando los datos durante toda la ejecucion
                    cookies.set("usu_nombres", resp.usu_nombres, { path: "/" })
                    cookies.set("usu_apellidos", resp.usu_apellidos, { path: "/" })
                    alert("Bienveni@ " + resp.usu_nombres)

                    window.location.href = './' // Esto es para recargar la pagina de inicio definida en el archivo app.js en  <Route path='/' element={<PageInicio />} />
                    //si se se quisiera ir a tra pagina tambien se podria
                } else {
                    alert("Verificar Usuario y/o Clave")
                }
            })
            .catch(error => {
                console.log(error)
            })

    }


    render() {
        return (
            <section className="h-100">
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="card shadow-lg">
                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4 text-center" >Iniciar Sesion</h1>
                                <form autocomplete="off">
                                    <div className="mb-3">
                                        <label className="mb-2 text" for="email">Usuario</label>
                                        <input id="email" type="email" className="form-control" name="username" onChange={this.handleChange} required autofocus />
                                        <div className="invalid-feedback">
                                            Email es invalido
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="pt-2 w-100">
                                            
                                            <label className="text-muted" for="password">Contraseña</label>
                                            
                                        </div>
                                        
                                        <input id="password" type="password" class="form-control" name="password" onChange={this.handleChange} required />
                                        <div className="invalid-feedback">
                                            La contraseña es requerida
                                            
                                        </div>
                                        
                                    </div>
                                    

                                    <div className="pt-1 mb-4">
                                                                       
                                        <button type="submit" className="btn btn-primary" onClick={() => this.iniciarSesion()}>Iniciar Sesión</button>
                                        
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer py-3 border-0">
                                <div class="text-center">
                                    
                                   No tienes una cuenta <a href="registro.html" class="text-primary">Crear cuenta</a>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-5 text-muted">
                            Copyright &copy; 2022 &mdash; Mision tic 2022
                        </div>
                    </div>
                </div>
            </div>

            
        </section>
        )
    }
}

export default PageLogin