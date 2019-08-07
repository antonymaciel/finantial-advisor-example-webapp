import portfoliosData from '../config/data/portfolios'
import { PORTFOLIOS_SELECT } from '../constants/portfolios'

export const initialState = {
    portfolios: portfoliosData,
    selectedPortfolio: 1
}


const data = (state = initialState, action) => {
    switch(action.type) {
        case PORTFOLIOS_SELECT:
            return {
                ...state,
                selectedPortfolio: action.portfolio ? action.portfolio : null
            };
        default:
                return state;
    } 
}

export default data;