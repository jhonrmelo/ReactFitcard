import React, { Component } from 'react';
import api from '../../../services/api';
import { Link } from 'react-router-dom';

import './index.css';

export default class Usuarios extends Component {
    state = {
        usuarios: []
    };

    componentDidMount() {
        this.listaUsuarios();
    }

    listaUsuarios = async () => {
        await api.get('/Condutor')
            .then(response => {
                this.setState({ usuarios: response.data });
            })
            .catch(error => this.setState({ erro: error.message }));
    }

    render() {
        const usuarios = this.state.usuarios.length;
        if(usuarios === 0) {
            return (
                <section className="users-list">
                    <div className="container">
                        <div className="alert alert-primary mb-5" role="alert">
                            Nenhum condutor cadastrado no sistema
                        </div>
                        <a className="btn btn-primary btn-block btn-lg" href="/condutor/inserir">Inserir</a>
                    </div>
                </section>
            )
        } else {
            return (
                <section className="users-list">
                    <div className="container">
                        <div className="d-flex align-items-center mb-4">
                            <h1>Lista de condutores</h1>
                            <a className="btn btn-light ml-auto back-link" href="/condutor/inserir">Inserir</a>
                        </div>
                        <div className="row">
                            {this.state.usuarios.map(usuario => (
                                <div key={usuario.id} className="col-6">
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <h5 className="card-title">{usuario.nome}</h5>
                                            <p className="card-text">Categoria: {usuario.categoria}</p>
                                            <Link to={`/condutor/${usuario.id}`} className="btn btn-primary">Visualizar</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )
        }
    }
}