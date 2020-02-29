import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import IndexCondutor from './pages/condutor/index/index';
import DetalhesCondutor from './pages/condutor/detalhes/detalhes';
import InserirCondutor from './pages/condutor/inserir/inserir';
import EditarCondutor from './pages/condutor/editar/editar';
import IndexVeiculo from './pages/veiculo/index/index';
import DetalhesVeiculo from './pages/veiculo/detalhes/detalhes';
import InserirVeiculo from './pages/veiculo/inserir/inserir';
//import EditarVeiculo from './pages/veiculo/editar/editar';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={IndexCondutor} />
            <Route exact path="/condutor/" component={IndexCondutor} />
            <Route exact path="/condutor/inserir" component={InserirCondutor} />
            <Route exact path="/condutor/:id" component={DetalhesCondutor} />
            <Route exact path="/condutor/editar/:id" component={EditarCondutor} />
            <Route exact path="/veiculo/" component={IndexVeiculo}/>
            <Route exact path="/veiculo/inserir" component={InserirVeiculo}/>
            <Route exact path="/veiculo/:id" component={DetalhesVeiculo}/>
            {/* <Route exact path="/veiculo/editar/:id" component={EditarVeiculo}/> */}
        </Switch>
    </BrowserRouter>
);

export default Routes;