import React from "react"
import { Link } from "react-router-dom"
import "../styles/components/header.scss";

class Header extends React.Component {

    render() {
        return (
            <div className="section flex header">
                <img className="logo" />
                <Link to="/">Home</Link> 
                <Link to="/recomend">Recomendations</Link> 
            </div>
        );
    }
}
export default Header;