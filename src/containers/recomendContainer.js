import React from "react"
import { connect } from 'react-redux'
import Recomend from "../screens/recomend"

class RecomendContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fields: new Array(props.categories.length).fill(0),
            recomendations: [],
            transactions: [],
            errors: new Array(props.categories.length).fill(false),
            showError: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.calculteRecomendations = this.calculteRecomendations.bind(this);
    }


    handleChange(event, field) {
        const value = event.target.value;
        const errorInput = value < 0 || Number.isInteger(value);
        let { fields, errors } = this.state;
        fields[field] = event.target.value;
        errors[field] = errorInput;
        const and = (a, b) => a + b;
        const showError = errors.reduce(and) === 1;
        this.setState({fields: [...fields], errors, showError});
    }

    handleSubmit(event) {
        if (!this.state.showError) {
            const recomendations = this.calculteRecomendations();
            const transactions = this.getTransactions([...recomendations])
            this.setState({recomendations, transactions}); 
        }
        event.preventDefault();
    }

    calculteRecomendations = () => {
        const { chartData } = this.props;
        const inputs = this.state.fields;
        const recomendations = [];
        const add = (a, b) => parseInt(a, 10) + parseInt(b, 10);
        const total = inputs.reduce(add);
        for (let i= 0; i < chartData.length; i++) {
            const value= inputs[i] - chartData[i]* total / 100;
            recomendations[i] = Math.round( value * 10) / 10;
        }
        return recomendations;
    }

    getTransactions = (recomendations) => {
        const { categories } = this.props;
        const transactions = [];

        // Priority 1: Iterate transfering the values when are the same but opposites
        let indexOfMin = 0;
        let indexOfMax = 0;
        for(let i= 0; i < recomendations.length; i++ ) {
            if (recomendations[i] !== 0) {
                for(let j= i + 1; j < recomendations.length; j++) {
                    if(recomendations[i] + recomendations[j] === 0) {
                        if(recomendations[i] > 0) {
                            transactions.push("Transfer $" + recomendations[i] + " from " + categories[i] + " to " + categories[j]);
                        } else {
                            transactions.push("Transfer $" + recomendations[j] + " from " + categories[j] + " to " + categories[i]);
                        }
                        recomendations[i] = 0;
                        recomendations[j] = 0;
                        break;
                    }
                }
                            
            }
            //get max / min
            if (recomendations[i] > recomendations[indexOfMax]) {
                indexOfMax = i;
            }

            if (recomendations[i] < recomendations[indexOfMin]) {
                indexOfMin = i;
            }
        }

        // Priority 2: Iterate transfering from bigger to smaller 
        let max = recomendations[indexOfMax];
        let min = recomendations[indexOfMin];
        while (max !== 0 && min !== 0) {
            let value= recomendations[indexOfMax] + recomendations[indexOfMin];
            if (recomendations[indexOfMax] > (recomendations[indexOfMin]*(-1))) {
                transactions.push("Transfer $" + recomendations[indexOfMin]*(-1) + " from " + categories[indexOfMax] + " to " + categories[indexOfMin]);
                recomendations[indexOfMax] = Math.round( value * 10) / 10;
                recomendations[indexOfMin] = 0;
            } else {
                transactions.push("Transfer $" + recomendations[indexOfMax] + " from " + categories[indexOfMax] + " to " + categories[indexOfMin]);
                recomendations[indexOfMin] = Math.round( value * 10) / 10;
                recomendations[indexOfMax] = 0;
            }
            for(let i= 0; i <= recomendations.length; i++) {
                if (recomendations[i] > recomendations[indexOfMax]) {
                    indexOfMax = i;
                }
    
                if (recomendations[i] < recomendations[indexOfMin]) {
                    indexOfMin = i;
                }
            }
            max = recomendations[indexOfMax];
            min = recomendations[indexOfMin];
        }
        return transactions;
    }

    render() {
        const { chartData, categories } = this.props;
        const { fields, recomendations, transactions, showError } = this.state;
        return (
            <Recomend 
                chartData={chartData}
                categories={categories}
                calculteRecomendations={this.calculteRecomendations}
                fields={fields}
                recomendations={recomendations}
                transactions={transactions}
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
