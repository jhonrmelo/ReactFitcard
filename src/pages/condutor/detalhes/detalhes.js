import React, { Component } from 'react';
import api from '../../../services/api';
import { Redirect } from 'react-router-dom';
import Moment from 'moment';

import './detalhes.css';

export default class Usuario extends Component {
    state = {
        usuario: {
            nome: '',
            cpf: '',
            cnh: '',
            categoria: '',
            validade: '',
            email: ''
        },
        erro: null,
        redirect: false
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        api.get(`/Condutor/${id}`)
            .then(response => {
                this.setState({ usuario: response.data });
            })
            .catch(error => this.setState({ erro: error.message }));
        
    }

    handleDelete = event => {
        event.preventDefault();

        const { id } = this.state.usuario;

        api.delete(`/Condutor/${id}`)
            .then(response => {
                this.setState({ redirect: true });
            })
            .catch(error => this.setState({ erro: error.message }));

    };

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/" />
        } else {
            const { usuario } = this.state;
            return (
                <section className="user-details">
                    <div className="container">
                        {this.state.erro &&
                            <div className="alert alert-danger" role="alert">
                                { this.state.erro }
                            </div>
                        }
                        <div className="d-flex align-items-center mb-4">
                            <h1>{usuario.nome}</h1>
                            <a className="btn btn-light ml-auto" href="/">Voltar</a>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">
                                    CPF: {usuario.cpf} <br />
                                    CNH: {usuario.cnh} <br />
                                    Categoria: {usuario.categoria} <br />
                                    Validade: {Moment(usuario.validade).format('YYYY-MM-DD')}<br />
                                    Email: <a href={`mailto:${usuario.email}`}>{usuario.email}</a>
                                </p>
                                <a href={`/condutor/editar/${usuario.id}`} className="btn btn-primary">Editar</a>
                                <button onClick={e => window.confirm(`Tem certeza que deseja excluir o condutor ${usuario.nome}?`) && this.handleDelete(e)} className="btn btn-danger">Excluir</button>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
    }
}