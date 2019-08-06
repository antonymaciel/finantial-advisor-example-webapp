import React from "react"
import { connect } from 'react-redux'
import { selectPortfolio } from '../actions/portfolios'
import Home from "../screens/home"

class HomeContainer extends React.Component {
	constructor(props){
		super(props);
		this.onSelect = this.onSelect.bind(this);
	}
	
	onSelect(risk) {
		this.props.selectPortfolio(risk);
	}

    render() {
		const { data } = this.props;
		return (
			<Home 
				riskSelected={data.selectedPortfolio}
				portfolios={data.portfolios}
				onSelect={this.onSelect}
			/>
		);
    }
}


const mapStateToProps = (state) => {
	return {
		data: state.data
	}
}

const mapDispatchToProps = dispatch => ({
	selectPortfolio: (portfolio) => dispatch(selectPortfolio(portfolio)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
