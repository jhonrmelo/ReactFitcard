import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Inserir from './inserir';

Enzyme.configure({ adapter: new Adapter() });

const wrapper = mount(<Inserir />)

describe('Teste da interface "Detalhes"', () => {
    it('Deve renderizar o componente e comparar com um snapshot', () => {
        const wrapperSnapshot = shallow(<Inserir />)
        expect(wrapperSnapshot.debug()).toMatchSnapshot();
    })

    it('Valida o campo nome', () => {

        const nome = 'Coding Jojo';

        const inputNome = wrapper.find('#nome');
        inputNome.instance().value = nome;
        inputNome.simulate('change');

        expect(wrapper.state().usuario.nome).toEqual(nome);
    })

    it('Valida o campo cpf', () => {

        const cpf = '___.___.___-__';

        const inputCpf = wrapper.find('input#cpf').at(0);
        inputCpf.instance().value = cpf;
        inputCpf.simulate('change');

        expect(wrapper.state().usuario.cpf).toEqual(cpf);
    })

    it('Valida o campo registro', () => {

        const registro = '___________';

        const inputRegistro = wrapper.find('#registro');
        inputRegistro.instance().value = registro;
        inputRegistro.simulate('change');

        expect(wrapper.state().usuario.registro).toEqual(registro);
    })

    it('Valida o campo validade', () => {

        const validade = '2020-10-10';

        const inputValidade = wrapper.find('#validade');
        inputValidade.instance().value = validade;
        inputValidade.simulate('change');

        expect(wrapper.state().usuario.validade).toEqual(validade);
    })

    it('Valida o campo email', () => {

        const email = 'email@dominio.com';

        const inputEmail = wrapper.find('#email');
        inputEmail.instance().value = email;
        inputEmail.simulate('change');

        expect(wrapper.state().usuario.email).toEqual(email);
    })

})
