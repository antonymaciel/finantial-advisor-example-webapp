import React from "react"
import { connect } from 'react-redux'
import Home from "../screens/home"

class HomeContainer extends React.Component {
    constructor(props){
		super(props);
		this.state= {
			test:'hello'
		}
    }

    render() {
        return (
			<div>
           		<Home />
			</div>
        );
    }
}


const mapStateToProps = (state) => {
	return {
		portfolios: state.portfolios
	}
}

export default connect(mapStateToProps, null)(HomeContainer);
