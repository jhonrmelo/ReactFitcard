import React, { Component } from 'react';
import api from '../../../services/api';
import { Redirect } from 'react-router-dom';
import Moment from 'moment';

import './detalhes.css';

export default class Detalhes extends Component {

    state = {
        veiculo: {
            id: '',
            placa: '',
            modeloId: 0,
            anoFabricacao: '',
            anoModelo: '',
            corId: '',
            dataLicenciamento: '',
            grupoId: '5',
        },
        Combustiveis: [],
        Condutores: [],
        erro: null,
        redirect: false
    };

    componentWillMount() {
        const id = this.props.match.params.id;
        api.get(`/Veiculo/${id}`)
            .then(response => {
                this.setState({ veiculo: response.data });
            })
            .catch(error => this.setState({ erro: error.message }));

        api.get(`/Condutor/GetAllByIdVeiculo/${id}`)
            .then(response => {
                this.setState({
                    veiculo: { Condutores: response.data }
                });
            })
            .catch(error => this.setState({ erro: error.message }));

        api.get(`/Combustivel/GetAllByVeiculoId/${id}`)
            .then(response => {
                this.setState(prevState => ({
                    veiculo: { Combustiveis: response.data }
                }));
            })
            .catch(error => this.setState({ erro: error.message }));

        console.log(this.state.veiculo);

    }


    handleDelete = event => {
        event.preventDefault();

        const { id } = this.state.veiculo;

        console.log(id);

        api.delete(`/Veiculo/${id}`)
            .then(response => {
                this.setState({ redirect: true });
            })
            .catch(error => this.setState({ erro: error.message }));

    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/veiculo" />
        } else {
            const { veiculo } = this.state;
            const {Combustiveis } = this.state.Combustiveis;
            const {Condutores } = this.state.Condutores;

            return (
                <section className="user-details">
                    <div className="container">
                        {this.state.erro &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.erro}
                            </div>
                        }
                        <div className="d-flex align-items-center mb-4">
                            <h1>{veiculo.nome}</h1>
                            <a className="btn btn-light ml-auto" href="/">Voltar</a>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">
                                    Placa: {veiculo.placa} <br />
                                    Modelo: {veiculo.modeloId} <br />
                                    Ano de Fabricação: {Moment(veiculo.anoFabricacao).format('DD-MM-YYYY')} <br />
                                    Ano do Modelo: {Moment(veiculo.anoModelo).format('DD-MM-YYYY')}<br />
                                    Data do Licenciamento: {Moment(veiculo.dataLicenciamento).format('DD-MM-YYYY')} <br />
                                    Condutores: {Condutores != null &&
                                        Condutores.map(x => x.nome + "  ")}<br />

                                    Combustiveis: {Combustiveis != null &&
                                        Combustiveis.map(x => x.nome + " ")}<br />
                                </p>
                                <a href={`/veiculo/editar/${veiculo.id}`} className="btn btn-primary">Editar</a>
                                <button onClick={e => window.confirm(`Tem certeza que deseja excluir o veículo ${veiculo.placa}?`) && this.handleDelete(e)} className="btn btn-danger">Excluir</button>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
    }

}