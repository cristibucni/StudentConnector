import React, { Component } from 'react';
import './Learning.css';
const locatii = {
    CORP_A_LEU_PARTER: 'Corp A Leu - Parter',
    CORP_A_LEU_ETAJ: 'Corp A Leu - Etajul 1',
    SALA_LECTURA: 'Sală de lectură - Cămin Leu A',
    BIBLIOTECA_CENTRALA: 'Biblioteca centrală - Campus UPB',
};

const locatiiArray = [locatii.CORP_A_LEU_PARTER, locatii.CORP_A_LEU_ETAJ, locatii.SALA_LECTURA, locatii.BIBLIOTECA_CENTRALA];

export class AddGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locatie: locatii.CORP_A_LEU_PARTER,
            nume: '',
            profesor: '',
            detalii: '',
        };
    }

    handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    };

    handleOnTypeSelect = (e) => {
        this.setState({ locatie: e.target.value });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = () => {
        if (this.state.nume !== '' || this.state.profesor !== '' || this.state.detalii !== '') {
            const data = {
                nume: this.state.nume,
                profesor: this.state.profesor,
                detalii: this.state.detalii,
                locatie: this.state.locatie,
            };
            this.props.onSubmit(data);
        }
    };

    render() {
        return (
            <div className="add-group-container">
                <strong>Adaugă grup</strong> <hr />
                <div className="section">
                    <div className="row">
                        <div className="col-md-2">
                            <label htmlFor="title">Materie</label>
                        </div>
                        <div className="col-md-10">
                            <input
                                type="text"
                                className={'input'}
                                name="nume"
                                onChange={(e) => this.onChange(e)}
                                onKeyPress={this.handleOnKeyPress}
                                autoComplete="off"
                                value={this.state.nume}
                            />
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="row">
                        <div className="col-md-2">
                            <label htmlFor="title">Profesor</label>
                        </div>
                        <div className="col-md-10">
                            <input
                                type="text"
                                className={'input'}
                                name="profesor"
                                onChange={(e) => this.onChange(e)}
                                onKeyPress={this.handleOnKeyPress}
                                autoComplete="off"
                                value={this.state.profesor}
                            />
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="row">
                        <div className="col-md-2">
                            <label htmlFor="title">Detalii</label>
                        </div>
                        <div className="col-md-10">
                            <input
                                type="text"
                                className={'input'}
                                name="detalii"
                                onChange={(e) => this.onChange(e)}
                                onKeyPress={this.handleOnKeyPress}
                                autoComplete="off"
                                value={this.state.detalii}
                            />
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="row">
                        <div className="col-md-2">
                            <label htmlFor="type">Locație</label>
                        </div>
                        <div className="col-md-10">
                            <select className="dropdown-select" name="locatie" onChange={(e) => this.handleOnTypeSelect(e)}>
                                {locatiiArray.map((locatie, key) => {
                                    return (
                                        <option value={locatie} key={key}>
                                            {locatie}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" onClick={this.onSubmit} />
            </div>
        );
    }
}
