import React from "react"
import { connect } from 'react-redux'
import Recomend from "../screens/recomend"

class RecomendContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fields: new Array(props.categories.length).fill(0),
            recomendations: [],
            errors: new Array(props.categories.length).fill(false),
            showError: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.calculteRecomendations = this.calculteRecomendations.bind(this);
    }


    handleChange(event, field) {
        const errorInput = parseInt(event.target.value, 10) < 0;
        let { fields, errors } = this.state;
        fields[field] = event.target.value;
        errors[field] = errorInput;
        const and = (a, b) => a + b;
        const showError = errors.reduce(and) === 1;
        this.setState({fields: [...fields], errors, showError});
    }

    handleSubmit(event) {
        if (!this.state.showError) {
            const recomendations = this.calculteRecomendations(this.state.fields);
            this.setState({recomendations}); 
        }
        event.preventDefault();
    }

    calculteRecomendations = (inputs) => {
        const { chartData } = this.props;
        const recomendations = [];
        const add = (a, b) => parseInt(a, 10) + parseInt(b, 10);
        const total = inputs.reduce(add);
        console.log('total', total);
        for (let i= 0; i < chartData.length; i++) {
            recomendations[i] = chartData[i]* total / 100 - inputs[i];
        }
        return recomendations;
    }

    render() {
        const { chartData, categories } = this.props;
        const { fields, recomendations, showError } = this.state;
        return (
            <Recomend 
                chartData={chartData}
                categories={categories}
                calculteRecomendations={this.calculteRecomendations}
                fields={fields}
                recomendations={recomendations}
                showError={showError}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            /> 
        );
    }
}

const mapStateToProps = (state) => {
    const { portfolios, selectedPortfolio } = state.data;
    const portfolio = portfolios.find( function(item) { return item.Risk === selectedPortfolio } );
    let categories= Object.keys(portfolio);
    categories.splice(0, 1);
    const chartData = [portfolio.Bonds, portfolio.LargeCap, portfolio.MidCap, portfolio.Foreign, portfolio.SmallCap];
	return {
        chartData,
        categories
	}
}

export default connect(mapStateToProps, null)(RecomendContainer);
