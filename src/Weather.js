import React from 'react';
import styles from './styles/WeatherStyles';

import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faCloud, faCloudSunRain, faCloudMoonRain, faBolt, faSnowflake, faSmog } from '@fortawesome/free-solid-svg-icons';
import CreateIcon from "@material-ui/icons/Create";
import { IconButton } from '@material-ui/core';
import classNames from "classnames";

function Weather(props) {
    const { classes, isEvening, city, country, showForm, temperature, id } = props;
    const icon = (id) => {
        const weather_icons = {
            thunderstorm: [faBolt, faBolt],
            drizzle: [faCloudSunRain, faCloudMoonRain],
            rain: [faCloudSunRain, faCloudMoonRain],
            snow: [faSnowflake, faSnowflake],
            atmosphere: [faSmog, faSmog],
            clear: [faSun, faMoon],
            clouds: [faCloud, faCloud],
        }
        if (id <= 232) return weather_icons.thunderstorm;
        else if (id <= 321) return weather_icons.drizzle;
        else if (id <= 531) return weather_icons.rain;
        else if (id <= 622) return weather_icons.snow;
        else if (id <= 781) return weather_icons.atmosphere;
        else if (id === 800) return weather_icons.clear;
        else return weather_icons.clouds;
    }

    return (
            <div>
                <h5 className={classes.text}>
                    {city.toUpperCase()} ({country.toUpperCase()})
                    <IconButton
                        color='inherit'
                        aria-label='Change city weather'
                        onClick={showForm}
                        className={classNames(classes.editBtn)}
                    >
                        <CreateIcon />
                    </IconButton>

                </h5>
                <FontAwesomeIcon
                    className={classes.icon}
                    icon={isEvening ? icon(id)[1] : icon(id)[0]}
                />
                <h1 className={classes.text}>{temperature}&deg;C</h1>
            </div>
    )
}

export default withStyles(styles)(Weather);