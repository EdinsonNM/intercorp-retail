import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import "../styles/client-item.scss";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    avatar: {
        margin: 10,
        color: "#fff",
        backgroundColor: "#90BC79"
    }
});
export default function ClientItem({
    id = "",
    firstname = "",
    lastname = "",
    birthday = "",
    age=0
}) {
    const classes = useStyles();
    var timestamp = 1301090400,
    date = new Date(birthday.seconds * 1000),
    datevalues = [
      date.getDate(),
      date.getMonth()+1,
      date.getFullYear(),
    ];
    return (
        <li className="client-item" >
            <div className="client-item__avatar">
                <Avatar className={classes.avatar}>
                    {firstname.length && firstname.substring(0, 1)}
                    {lastname.length && lastname.substring(0, 1)}
                </Avatar>
            </div>
            <div className="client-item__content">
                <div className="client-item__content__title">
                    {firstname} {lastname}
                </div>
                <div className="client-item__content__subtitle">
                    Nació el {datevalues.join('/')}, actualmente tiene {age} años
                </div>
            </div>
        </li>
    );
}

ClientItem.propTypes = {
    id: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
};
