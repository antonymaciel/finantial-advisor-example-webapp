import React from "react"
import { Link } from "react-router-dom"
import "../styles/components/header.scss";

class Header extends React.Component {

    render() {
        return (
            <div className="section flex header">
                <Link className="link" to="/">Home</Link> 
                <Link className="link" to="/recomend">Recomendations</Link> 
            </div>
        );
    }
}
export default Header;