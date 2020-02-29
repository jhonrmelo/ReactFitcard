import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../../../services/api';
import InputMask from 'react-input-mask';
import Moment from 'moment';
import Select from '../../../components/select';
import { cpf } from 'cpf-cnpj-validator';

import './editar.css';

class Editar extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        api.get(`/Condutor/${id}`)
            .then(response => {
                console.log(response.data)
                this.setState({ usuario: response.data });
                console.log(this.state.usuario)
            })
            .catch(error => this.setState({ erro: error.message }));
    }
    

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            usuario: { ...prevState.usuario, [name]: value }
        }));
    };

    handleSelectChange = (selectedOptions, element) => {
        const name = element.name;
        const value = Object.values(selectedOptions)[0];
        this.setState(prevState => ({
            usuario: { ...prevState.usuario, [name]: value }
        }));
    }

    handleSelectMultiChange = (selectedOptions, element) => {
        const name = element.name;
        let tempArray = [ ...this.state.usuario[name] ];
        if(selectedOptions.length > 1) {
            selectedOptions.forEach(option => {
                const value = Object.values(option)[0];
                tempArray.push(value);
            });
        } else {
            tempArray.length = 0;
        }
        this.setState(prevState => ({
            usuario: { ...prevState.usuario, [name]: tempArray }
        }));
    }

    handleSubmit = event => {
        event.preventDefault();

        const { id } = this.state.usuario;

        if(cpf.isValid(this.state.usuario.cpf)) {
            this.setState({ erro: null });
            api.put(`/Condutor/${id}`, this.state.usuario)
                .then(data => {
                    this.setState({ redirect: true });
                })
                .catch(error => this.setState({ erro: error.message }));
        } else {
            this.setState({ erro: 'Insira um CPF válido' });
        }   
    };

    render() {
        const { id } = this.props.match.params;
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/" />
        } else {
            return (
                <section className="new-user">
                    <div className="container">
                        {this.state.erro &&
                            <div className="alert alert-danger" role="alert">
                                { this.state.erro }
                            </div>
                        }
                        <form onSubmit={this.handleSubmit}>
                            <fieldset>
                                <div className="d-flex align-items-center mb-4">
                                    <h1>Editar condutor</h1>
                                    <Link to={`/condutor/${id}`} className="btn btn-light ml-auto">Voltar</Link>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nome">Nome</label>
                                    <input className="form-control" type="text" id="nome" name="nome" value={this.state.usuario.nome} onChange={this.handleInputChange} required />
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="cpf">CPF</label>
                                            <InputMask mask="999.999.999-99" className="form-control" type="text" id="cpf" name="cpf" value={this.state.usuario.cpf} onChange={this.handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="cnh">CNH</label>
                                            <InputMask mask="99999999999" className="form-control" type="text" id="cnh" name="cnh" value={this.state.usuario.cnh} onChange={this.handleInputChange} required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="categoria">Categoria</label>
                                            <Select name="categoria" id="categoria" recurso="CategoriaCnh" onChange={this.handleSelectChange} value="valor" label="texto" />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label htmlFor="validade">Validade</label>
                                            <input className="form-control" type="date" id="validade" name="validade" value={Moment(this.state.usuario.validade).format('YYYY-MM-DD')} onChange={this.handleInputChange} required max="2030-12-31" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input className="form-control" type="email" id="email" name="email" value={this.state.usuario.email} onChange={this.handleInputChange} required />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <button className="btn btn-primary btn-lg btn-block">Atualizar</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </section>
            )
        }
    }
}

export default Editar;
