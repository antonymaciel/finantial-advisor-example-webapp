import React from "react"
import { connect } from 'react-redux'
import Recomend from "../screens/recomend"

class RecomendContainer extends React.Component {
    constructor(props){
        super(props);
        this.calculteRecomendations = this.calculteRecomendations.bind(this);
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
        return (
            <Recomend 
                chartData={chartData}
                categories={categories}
                calculteRecomendations={this.calculteRecomendations}
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
