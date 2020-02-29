import React, { Component } from 'react';
import Select from '../../../components/select';
import api from '../../../services/api';

class Inserir extends Component {
    constructor() {
        super()
        this.state = {
            veiculo: {
                id: '',
                placa: '',
                modeloId: 0,
                anoFabricacao: '',
                anoModelo: '',
                corId: '',
                dataLicenciamento: '',
                grupoId: '5',
                CombustiveisIds: [],
                CondutoresIds: []
            },
            showModelo: null,
            marcaVeiculoId: '',
            erro: null,
            redirect: false
        }
    }

    handlerMarcaChange = async (selectedOptions, element) => {

        await this.setState({ showModelo: null });
        const name = element.name;
        const value = Object.values(selectedOptions)[0];

        this.setState({ marcaVeiculoId: value });
        await this.setState(prevState => ({
            veiculo: { ...prevState.veiculo, [name]: value }
        }));
        await this.setState({ showModelo: true });
    }

    handlerCorChange = (selectedOptions, element) => {

        const name = element.name;
        const value = Object.values(selectedOptions)[0];

        this.setVeiculo(name,value);

    }

    setVeiculo = (name, value) => {
        this.setState(prevState => ({
            veiculo: { ...prevState.veiculo, [name]: value }
        }));

        console.log(this.state.veiculo);
    }

    handleSelectChange = (selectedOptions, element) => {
        const name = element.name;
        const value = Object.values(selectedOptions)[0];
        this.setState(prevState => ({
            veiculo: { ...prevState.veiculo, [name]: value }
        }));
    }

    handleSelectMultiChange = (selectedOptions, element) => {
        const name = element.name;
        let tempArray = [ ...this.state.veiculo[name] ];
        console.log("tempArray", tempArray);
        
        if(selectedOptions.length > 1) {
            selectedOptions.forEach(option => {
                const value = Object.values(option)[0];
                tempArray.push(value);
            });
        } else {
            tempArray.length = 0;
        }
        this.setState(prevState => ({
            veiculo: { ...prevState.veiculo, [name]: tempArray }
        }));
    }


    handlerCondutoresChange = (selectedOptions, element) => {
        const name = element.name;
        const value = Object.values(selectedOptions);
    }

    handlerModeloChange = (selectedOptions, element) => {

    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            veiculo: { ...prevState.veiculo, [name]: value }
        }));
    }

    listaModelo = async (id) => {
        await api.get('/ModeloVeiculo/' + id)
            .then(response => {
                this.setState({ marcaVeiculo: response.data });
            })
            .catch(error => this.setState({ erro: error.message }));
    }
    

    handleSubmit = event => {
        event.preventDefault();

        api.post('/Veiculo', this.state.veiculo)
        .then( () => {
            this.setState({ redirect: true });
        })
        .catch(error => this.setState({ erro: error.message }));
        console.log(this.state.veiculo)
        
    };

    render() {
        return (
            <section className="new-user">
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <div className="d-flex align-items-center mb-4">
                                <h1>Cadastro de veiculo</h1>
                                <a className="btn btn-light ml-auto back-link" href="/">Voltar</a>
                            </div>
                            {this.state.erro &&
                                <div className="alert alert-danger" role="alert">
                                    {this.state.erro}
                                </div>
                            }
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <label htmlFor="placa">Placa</label>
                                        <input className="form-control" type="text" id="placa" name="placa" value={this.state.veiculo.placa} onChange={this.handleInputChange} required />
                                    </div>
                                    <div className="col-sm-4">
                                        <label htmlFor="marca">Marca</label>
                                        <Select name="marcaId" id="marca" recurso="MarcaVeiculo" onChange={this.handlerMarcaChange} value="marcaId" label="nome" />
                                    </div>
                                    {this.state.showModelo != null &&
                                        <div className="col-sm-5">
                                            <div className="form-group">
                                                <label htmlFor="categoria">Modelo</label>
                                                <Select name="modeloId" id="modelo" recurso={`ModeloVeiculo/GetAllByMarca/${this.state.marcaVeiculoId}`} onChange={this.handleSelectChange} value="id" label="nome" />
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <label htmlFor="anoFabricacao">Ano de Fabricação</label>
                                        <input className="form-control" type="number" id="anoFabricacao" name="anoFabricacao" value={this.state.veiculo.anoFabricacao} onChange={this.handleInputChange} required />
                                    </div>
                                    <div className="col-sm-2">
                                        <label htmlFor="anoModelo">Ano modelo</label>
                                        <input className="form-control" type="number" id="anoModelo" name="anoModelo" value={this.state.veiculo.anoModelo} onChange={this.handleInputChange} required />
                                    </div>
                                    <div className="col-sm-3">
                                        <label htmlFor="corId">Cor</label>
                                        <Select name="corId" id="corId" recurso="Cor" onChange={this.handleSelectChange} value="id" label="nome" />
                                    </div>
                                    <div className="col-sm-3">
                                        <label htmlFor="dataLicenciamento">Data do Licenciamento</label>
                                        <input className="form-control" type="date" id="dataLicenciamento" name="dataLicenciamento" value={this.state.veiculo.dataLicenciamento} onChange={this.handleInputChange} required  max="2030-12-31" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-5">
                                        <label htmlFor="combustiveisIds">Combustíveis</label>
                                        <Select name="CombustiveisIds" id="CombustiveisIds" IsMulti recurso="Combustivel" onChange={this.handleSelectMultiChange } value="id" label="nome" />
                                    </div>
                                    <div className="col-sm-5">
                                        <label htmlFor="CondutoresIds">Condutores</label>
                                        <Select name="CondutoresIds" id="CondutoresIds" IsMulti recurso="Condutor" onChange={this.handleSelectMultiChange } value="id" label="nome" />
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


export default Inserir;