import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import FocusCheckbox from './FocusCheckbox';

import styles from './FocusWrapperStyles';

class Focus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusName: '',
      formIsShowing: true,
      checked: false,
    };
  }

  componentDidMount() {
    const focus = JSON.parse(window.localStorage.getItem('focus'));
    if (focus && focus.focusName) {
      this.setState({
        focusName: focus.focusName,
        checked: focus.checked,
        formIsShowing: false,
      });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateLocalStorage = () => {
    const { focusName, checked } = this.state;
    const focus = {
      focusName,
      checked,
    };
    window.localStorage.setItem('focus', JSON.stringify(focus));
  };

  handleSubmit = e => {
    const { focusName } = this.state;
    e.preventDefault();
    if (focusName) {
      this.setState({ formIsShowing: false }, () => this.updateLocalStorage());
    }
  };

  handleCheck = () => {
    this.setState(
      st => ({ checked: !st.checked }),
      () => this.updateLocalStorage(),
    );
  };

  handleClick = () => {
    this.setState(
      {
        focusName: '',
        formIsShowing: true,
        checked: false,
      },
      () => this.updateLocalStorage(),
    );
  };

  render() {
    const { focusName, formIsShowing, checked } = this.state;
    const { classes } = this.props;
    const form = (
      <form onSubmit={this.handleSubmit} style={{ display: 'inline-block' }}>
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
    return (
      <div className={classes.Focus}>
        {formIsShowing ? (
          form
        ) : (
          <FocusCheckbox
            checked={checked}
            focusName={focusName}
            handleClick={this.handleClick}
            handleCheck={this.handleCheck}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Focus);
