import React, { Component } from 'react';
import ToDoList from './ToDoList';
import ToDoListMenu from './ToDoListMenu';

import Button from '@material-ui/core/Button';

import { withStyles } from "@material-ui/core/styles";

const styles = {
    button: {
        position: "relative",
        color: "white",
        "&:hover": {
            backgroundColor: "rgba(0,0,0,0.3)",
        }
    },
    window: {
        position: "absolute",
        bottom: "40px",
        right: "0px",
        backgroundColor: "#1D2636",
        borderRadius: "10px",
        width: "320px",
        padding: "20px",
        textAlign: "left"
    }
};

class ToDoWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            windowOpen: true,
            currentList: 'today',
            toDoLists: { inbox: [], today: [{task: "laundry", id: 1, checked: false}], done: [{task: "breakfast", id: 2, checked: true}] }
        }
        this.toggleWindow = this.toggleWindow.bind(this);
        this.updateList = this.updateList.bind(this);
    }
    toggleWindow = () => this.setState(st => ({ windowOpen: !st.windowOpen }));

    changeList = (listName) => this.setState({currentList: listName});

    updateList(listName, updatedList) {
        this.setState(st => ({ toDoLists: { ...st.toDoLists, [listName]: updatedList } }));
    }

    toggleChecked() {

    }

    render() {
        const { classes } = this.props;
        const { windowOpen, currentList, toDoLists } = this.state;
        return (
            <div>
                {windowOpen &&
                    <div className={classes.window}>
                        <ToDoListMenu currentList={currentList} changeList={this.changeList}/>
                        <ToDoList toDoList={toDoLists[currentList]} listName={currentList} updateList={this.updateList} />
                    </div>
                }
                <Button className={classes.button} onClick={this.toggleWindow}>
                    TODO
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(ToDoWidget);