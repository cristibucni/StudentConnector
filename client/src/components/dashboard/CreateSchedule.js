import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
const days = ['luni', 'marti', 'miercuri', 'joi', 'vineri'];

class CreateSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            luni: [],
            marti: [],
            miercuri: [],
            joi: [],
            vineri: [],
            selectedDay: 0,
            loading: true,
        };
    }

    componentDidMount() {
        axios.get('/api/subjects').then((response) => {
            const subjects = response.data;
            const sortedSubjects = subjects.sort((subject1, subject2) => {
                if (subject1.title < subject2.title) {
                    return -1;
                }
                if (subject1.title > subject2.title) {
                    return 1;
                }
            });
            this.setState({
                subjects: sortedSubjects,
                loading: false,
            });
        });
    }

    addItem = (day) => {
        let itemArray = this.state[day];
        itemArray.push({
            name: 'Algebra',
            startTs_endTs: '',
        });
        this.setState({ [days[this.state.selectedDay]]: itemArray });
    };

    onChange = (e, day, index) => {
        const attribute = e.target.name;
        let itemArray = this.state[day];
        itemArray[index][attribute] = e.target.value;
        this.setState({ [day]: itemArray });
    };

    onDelete = (e, day, index) => {
        let items = this.state[day];
        items[index] = {};
        const newItems = items.filter((item) => {
            return !_.isEmpty(item);
        });
        this.setState({ [day]: newItems });
    };

    handleOnTypeSelect = (e, day, index) => {
        const attribute = e.target.name;
        let itemArray = this.state[day];
        itemArray[index][attribute] = e.target.value;
        this.setState({ [day]: itemArray });
    };

    renderDay = (day) => {
        return this.state[day].map((item, index) => {
            return (
                <div key={index} className="category-card">
                    <button onClick={(e) => this.onDelete(e, day, index)} className="delete-category-button">
                        &#10006;
                    </button>
                    <div className="row">
                        <div className="col-md-2">
                            <label>Nume</label>
                        </div>
                        <div className="col-md-10">
                            <select
                                className="dropdown-select"
                                name="name"
                                onChange={(e) => this.handleOnTypeSelect(e, day, index)}
                                value={this.state[day][index].name}>
                                {this.state.subjects.map((subject, key) => {
                                    return (
                                        <option value={subject.title} key={key}>
                                            {subject.title}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <label>Interval orar</label>
                        </div>
                        <div className="col-md-10">
                            <input
                                type="text"
                                className="input"
                                name="startTs_endTs"
                                onChange={(e) => this.onChange(e, day, index)}
                                autoComplete="off"
                                value={item.startTs_endTs}
                            />
                        </div>
                    </div>
                </div>
            );
        });
    };

    nextDay = () => {
        let hasErrors = false;
        this.state[days[this.state.selectedDay]].forEach((item) => {
            if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/i.test(item.startTs_endTs)) {
                hasErrors = true;
            }
        });
        if (!hasErrors) {
            this.setState({ selectedDay: this.state.selectedDay + 1, hasErrors: false });
        } else {
            this.setState({ hasErrors: true });
        }
    };
    previousDay = () => {
        this.setState({ selectedDay: this.state.selectedDay - 1 });
    };

    submitData = () => {
        const schedule = {
            luni: this.state.luni,
            marti: this.state.marti,
            miercuri: this.state.miercuri,
            joi: this.state.joi,
            vineri: this.state.vineri,
        };
        this.props.sendSchedule(schedule);
    };

    render() {
        console.log(this.state);
        return (
            <React.Fragment>
                <div className="create-schedule-day">
                    {days[this.state.selectedDay]}{' '}
                    <button className="schedule-add-item" onClick={(e) => this.addItem(days[this.state.selectedDay])}>
                        {'\u271a'}
                    </button>
                </div>{' '}
                <br />
                {this.state.hasErrors && <div className="schedule-error-message">*Formatul intervalului orar trebuie să fie HH:MM-HH:MM</div>}
                {this.renderDay(days[this.state.selectedDay])}
                <React.Fragment>
                    <center>
                        {this.state.selectedDay > 0 && (
                            <button className="btn btn-secondary mt-4" onClick={(e) => this.previousDay()}>
                                Precedent
                            </button>
                        )}
                        {this.state.selectedDay < 4 ? (
                            <button className="btn btn-info mt-4" onClick={(e) => this.nextDay()}>
                                Următor
                            </button>
                        ) : (
                            <button className="btn btn-info mt-4" onClick={(e) => this.submitData()}>
                                Trimite
                            </button>
                        )}
                    </center>
                </React.Fragment>
            </React.Fragment>
        );
    }
}

export default CreateSchedule;
