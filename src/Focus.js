import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = {
    Focus: {
        fontSize: "30px",
    },
    textField: {
        "& input, label": {
            color: "white",
            fontWeight: 500,
        },
        "& label:active": {
            color: "white",
            fontSize: "25px",

        },
        "& label.MuiFormLabel-filled": {
            display: "none",
        },

        '& label.Mui-focused': {
            color: 'white',
            fontSize: "25px",
        },
        '& .MuiInput-underline:after:before': {
            borderBottomColor: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
    },
    focusField: {
        width: 400,
        "& input": {
            fontSize: "30px",
            textAlign: "center"
        },
        "& label": {
            fontSize: "30px",
        },
    },
    checkbox: {
        margin: "10px",
        backgroundColor: "red"
    }
};

class Focus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusName: "",
            formIsShowing: true,
            checked: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }
    componentDidMount() {
        const focusName = JSON.parse(window.localStorage.getItem("focusName"));
        if (focusName) {
            this.setState({ focusName, formIsShowing: false });
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ formIsShowing: false });
        window.localStorage.setItem("focusName", JSON.stringify(this.state.focusName));
    }
    handleCheck(){
        this.setState(st => ({checked: !st.checked}))
    }
    render() {
        const { focusName, formIsShowing, checked } = this.state;
        const { classes } = this.props;
        const form = (
            <form onSubmit={this.handleSubmit} style={{ display: "inline-block" }}>
                <TextField
                    id="standard-basic"
                    className={classNames(classes.textField, classes.focusField)}
                    label="What is your focus for today?"
                    margin="normal"
                    value={focusName}
                    name="focusName"
                    onChange={this.handleChange}
                />
            </form>
        );
        const focusCheckbox = (
            <div >
                <p>TODAY</p>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked} onChange={this.handleCheck}
                            value={focusName} />
                    }
                    label={focusName}
                />
                <p>Great work!</p>
            </div>
        )
        return (
            <div className={classes.Focus}>
                {formIsShowing ? form : focusCheckbox}
            </div>


        )
    }
}

export default withStyles(styles)(Focus);