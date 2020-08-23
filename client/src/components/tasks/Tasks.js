import React, { Component } from 'react';
import axios from 'axios';
import AddItem from './AddItem';
import _ from 'lodash';
import Item from './Item';

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasksArray: [],
            duplicateTitle: false,
        };
    }

    componentDidMount() {
        this.setState({
            tasksArray: this.props.tasksArray,
        });
    }

    onAddNewTask = (data) => {
        let flag = false;
        this.state.tasksArray.forEach((task) => {
            if (task.name === data.name) {
                flag = true;
            }
        });
        if (!flag) {
            axios
                .post('/api/users/current/tasks', data)
                .then((response) => {
                    const { status } = response;
                    if (status === 200) {
                        this.setState({
                            tasksArray: response.data.tasks,
                            duplicateTitle: false,
                        });
                    }
                })
                .catch((error) => {
                    this.handleErrors(error.response.data);
                });
        } else {
            this.setState({ duplicateTitle: true });
        }
    };

    onDeleteTask = (taskId) => {
        axios
            .put('/api/users/current/tasks/' + taskId)
            .then((response) => {
                let { tasksArray } = this.state;
                const newTasksArray = tasksArray.filter((task) => task._id !== taskId);
                this.setState({
                    tasksArray: newTasksArray,
                });
            })
            .catch((error) => {
                this.handleErrors(error.response.data);
            });
    };

    handleErrors = (error) => {
        var msg = Object.values(error).map(function (value) {
            return value;
        });
        return window.alert(msg);
    };

    renderTasks = () => {
        const { tasksArray } = this.state;
        return _.isEmpty(tasksArray)
            ? ''
            : tasksArray.map((item, index) => {
                  return (
                      <div className="quiz-list-item-row" key={index}>
                          <Item
                              onDelete={this.onDeleteTask}
                              data={item}
                              key={item._id}
                              handleCheckbox={this.onDeleteTask}
                              checked={item.itemDone}
                              onEditDone={this.onEditTask}
                          />
                      </div>
                  );
              });
    };

    â;

    render() {
        return this.state.loading ? (
            ''
        ) : (
            <React.Fragment>
                <br />
                <div className="quizes-list-header">Programări examene</div>
                <br />
                <br />
                <div className="row row-schedule justify-content-center">
                    <div className="col-md-8">
                        {' '}
                        <div className="tasks-header">Examene viitoare</div>
                        <div className="quizes-list-container">{this.renderTasks()}</div>
                    </div>
                    <div className="col-md-4">
                        <AddItem onSubmit={this.onAddNewTask} duplicateTitle={this.state.duplicateTitle} subjects={this.props.subjects} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Tasks;
