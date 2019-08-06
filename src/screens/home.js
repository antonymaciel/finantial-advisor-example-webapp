import React from "react"
import { Link } from "react-router-dom"
import { Button } from 'react-foundation';
import Griddle from 'griddle-react';
import Header from "../components/header"
import "../styles/screens/home.scss";
import "../styles/index.scss";

class Home extends React.Component {

    renderButtons = () => {
        const { portfolios, riskSelected, onSelect } = this.props;
        const riskbuttons = [];
        portfolios.forEach(element => {
            const classButton ="risk-button is-danger" + ((riskSelected !== element.Risk) ? " is-outlined" : "");
            riskbuttons.push(
                <Button 
                    key={element.risk} 
                    className={classButton}
                    onClick={() => onSelect(element.Risk)}>
                        {'Risk ' + element.Risk}
                </Button>
            )
        });
        return riskbuttons;
    }

    render() {
        return (
            <div className="containerpage flex">
                <Header />
                <div className="section flex">
                    <div className="griddle-container">
                        <Griddle 
                            data={this.props.portfolios} 
                            PageDropdown={null}
                            PageDropdownContainer={null}
                        />
                    </div>
                    <div className="flex">
                        <h2 className="subtitle">Please Select A Risk Level For Your Investment Portfolio</h2>
                        {this.renderButtons()}
                    </div>
                    <div className="flex link-container">
                        <Link className="button link-recomend" to="/recomend">Get Recomendations!</Link> 
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;