import React, { Component } from "react";
import Clock from "../../components/Clock/Clock";
import Message from "../../Message";
import Focus from "../../Focus";
import WeatherWidget from "../../components/WeatherWidget/WeatherWidget";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import QuoteWidget from "../../components/QuoteWidget/QuoteWidget";
import ToDoWidget from "../../components/ToDoWidget/ToDoWidget";
import MyButton from "../../components/MyButton/MyButton";
import { Link } from "react-router-dom";
import styles from "./DashboardViewStyles";

import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import FavoriteIcon from "@material-ui/icons/Favorite";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: this.setHour(),
      min: this.setMinute(),
      isMorning: this.setHour() >= 6 && this.setHour() < 12,
      isAfternoon: this.setHour() >= 12 && this.setHour() < 18,
      isEvening: this.setHour() >= 18 || this.setHour() < 6,
      componentLoading: true
    };
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    setTimeout(() => this.setState({ componentLoading: false }), 900);
    setInterval(() => {
      // prevent this.setState() on an unmounted component
      if (this._isMounted) {
        this.setState({
          hour: this.setHour(),
          min: this.setMinute(),
          isMorning: this.setHour() >= 6 && this.setHour() < 12,
          isAfternoon: this.setHour() >= 12 && this.setHour() < 18,
          isEvening: this.setHour() >= 18 || this.setHour() < 6
        });
      }
    }, 1000);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  setHour = () => new Date().getHours();
  setMinute = () => new Date().getMinutes();
  render() {
    const {
      hour,
      min,
      isMorning,
      isAfternoon,
      isEvening,
      componentLoading
    } = this.state;
    const { classes, addQuote, removeQuote } = this.props;
    return (
      <div
        className={classNames(classes.root, {
          [classes.morning]: isMorning,
          [classes.afternoon]: isAfternoon,
          [classes.evening]: isEvening
        })}
      >
        <nav className={classes.nav}>
          <Link to="/favorite-quotes">
            <MyButton withBackground>
              <FavoriteIcon fontSize="small" /> Quotes
            </MyButton>
          </Link>
        </nav>
        {componentLoading && (
          <div className={classes.loadingScreen}>
            <LoadingSpinner />
          </div>
        )}
        <section className={classes.weatherWrapper}>
          <WeatherWidget isEvening={isEvening} />
        </section>
        <section className={classes.clockWrapper}>
          <Clock hour={hour} min={min} />
        </section>
        <section className={classes.messageAndFocusWrapper}>
          <Message isMorning={isMorning} isAfternoon={isAfternoon} />
          <Focus />
        </section>
        <section className={classes.quoteWrapper}>
          <QuoteWidget addQuote={addQuote} removeQuote={removeQuote} />
        </section>
        <section className={classes.toDoWrapper}>
          <ToDoWidget />
        </section>
      </div>
    );
  }
}

export default withStyles(styles)(Main);