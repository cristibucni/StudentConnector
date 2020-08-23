import React, { Component } from 'react';
import Moment from 'react-moment';
const locatii = {
    FACULTATE: 'Facultate',
    SALA_LECTURA: 'Sală de lectură - Cămin Leu A',
    CANTINA: 'Cantină Leu',
};

const locatiiArray = [locatii.FACULTATE, locatii.SALA_LECTURA, locatii.CANTINA];

export class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locatie: locatii.FACULTATE,
            nume: '',
            data: '',
            ora: '',
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
        if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/i.test(this.state.ora) && this.state.nume !== '' && this.state.profesor !== '' && this.state.detalii !== '') {
            const data = {
                nume: this.state.nume,
                data: this.state.data + ' ' + this.state.ora,
                detalii: this.state.detalii,
                locatie: this.state.locatie,
            };
            this.props.onSubmit(data);
        }
    };

    render() {
        return (
            <div className="add-group-container">
                <strong>Adaugă eveniment</strong> <hr />
                <div className="section">
                    <div className="row">
                        <div className="col-md-2">
                            <label htmlFor="title">Nume</label>
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
                            <label htmlFor="title">Data</label>
                        </div>
                        <div className="col-md-10">
                            <input
                                type="date"
                                id="start"
                                name="data"
                                onChange={this.onChange}
                                value={this.state.data}
                                className="date-input"
                                max="2099/12/31"
                                min={<Moment format="MM/DD/YYYY">{new Date()}</Moment>}
                            />
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="row">
                        <div className="col-md-2">
                            <label htmlFor="title">Ora</label>
                        </div>
                        <div className="col-md-10">
                            <input
                                type="text"
                                className={'input'}
                                name="ora"
                                onChange={(e) => this.onChange(e)}
                                onKeyPress={this.handleOnKeyPress}
                                autoComplete="off"
                                value={this.state.ora}
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
