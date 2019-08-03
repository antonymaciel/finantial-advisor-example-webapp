import React from "react"
import { connect } from 'react-redux'
import Recomend from "../screens/recomend"

class RecomendContainer extends React.Component {
    constructor(props){
		super(props);
		this.state= {
			test:'hello'
		}
    }

    render() {
        return (
            <Recomend/> 
        );
    }
}


const mapStateToProps = (state) => {
	return {
		portfolios: state.portfolios
	}
}

export default connect(mapStateToProps, null)(RecomendContainer);
