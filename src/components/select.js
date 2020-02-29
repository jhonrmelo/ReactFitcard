import React, { Component } from 'react';
import api from '../services/api';
import AsyncSelect from 'react-select/async';

class Select extends Component {
    getOptionLabel = option => option[this.props.label];
    getOptionValue = option => option[this.props.value];

    async getOptions() {
        const result = await api.get(`/${this.props.recurso}`)
            .then(response => {
                return response.data;
            })
            .catch(error => console.log(error.message));
        if (result) {
          return result;
        }
        return [];
    }

    render() {
        if (this.props.IsMulti) {
            return(
                <AsyncSelect isMulti defaultOptions onChange={this.props.onChange} loadOptions={this.getOptions.bind(this)} getOptionValue={this.getOptionValue} getOptionLabel={this.getOptionLabel} name={this.props.name} />
            )
        } else {
            return(
                <AsyncSelect defaultOptions onChange={this.props.onChange} loadOptions={this.getOptions.bind(this)} getOptionValue={this.getOptionValue} getOptionLabel={this.getOptionLabel} name={this.props.name} />
            )
        }
    }
}

export default Select;