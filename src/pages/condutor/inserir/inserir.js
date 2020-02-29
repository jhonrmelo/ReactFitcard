import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../../services/api';
import InputMask from 'react-input-mask';
import Select from '../../../components/select';
import { cpf } from 'cpf-cnpj-validator';

class Inserir extends Component {
    constructor() {
        super();

        this.state = {
            veiculo: [],
            erro: null,
            redirect: false
        }
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

        if(cpf.isValid(this.state.usuario.cpf)) {
            api.post('/Condutor', this.state.usuario)
            .then( () => {
                this.setState({ redirect: true });
            })
            .catch(error => this.setState({ erro: error.message }));
        } else {
            this.setState({ erro: 'Insira um CPF válido' });
        }
        
    };

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/" />
        } else {
            return (
                <section className="new-user">
                    <div className="container">
                        <form onSubmit={this.handleSubmit}>
                            <fieldset>
                                <div className="d-flex align-items-center mb-4">
                                    <h1>Cadastro de condutor</h1>
                                    <a className="btn btn-light ml-auto back-link" href="/">Voltar</a>
                                </div>
                                {this.state.erro &&
                                    <div className="alert alert-danger" role="alert">
                                        { this.state.erro }
                                    </div>
                                }
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
                                            <input className="form-control" type="date" id="validade" name="validade" value={this.state.usuario.validade} onChange={this.handleInputChange} required max="2030-12-31" />
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
                                    <button id="btn-inserir" className="btn btn-primary btn-lg btn-block">Inserir</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </section>
            )
        }
    }

}

export default Inserir;
