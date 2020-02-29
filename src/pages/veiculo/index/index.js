import React, {Component} from 'react';
import api from '../../../services/api';
import { Link } from 'react-router-dom';

import './index.css';

export default class Veiculo extends Component{
    state = {
        veiculos: []
    };

    componentDidMount(){
        this.listaVeiculos();
    }

    listaVeiculos = async () => {
        await api.get('/Veiculo')
            .then(response => {
                this.setState({ veiculos: response.data });
            })
            .catch(error => this.setState({ erro: error.message }));
    }

    render() {
        const veiculos = this.state.veiculos.length;

        if(veiculos == 0){
            return (
                <section className="users-list">
                    <div className="container">
                        <div className="alert alert-primary mb-5" role="alert">
                            Nenhum veiculo cadastrado no sistema
                        </div>
                        <a className="btn btn-primary btn-block btn-lg" href="/veiculo/inserir">Inserir</a>
                    </div>
                </section>
            )
        }else{
            return (
                <section className="users-list">
                    <div className="container">
                        <div className="d-flex align-items-center mb-4">
                            <h1>Lista de Veículos</h1>
                            <a className="btn btn-light ml-auto back-link" href="/veiculo/inserir">Inserir</a>
                        </div>
                        <div className="row">
                            {this.state.veiculos.map(veiculo => (
                                <div key={veiculo.id} className="col-6">
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <h5 className="card-title">{veiculo.placa}</h5>
                                            <p className="card-text">anoModelo: {veiculo.anoModelo}</p>
                                            <Link to={`/veiculo/${veiculo.id}`} className="btn btn-primary">Visualizar</Link>
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