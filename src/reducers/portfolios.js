import { portfoliosData } from '../config/data/portfolios'
import { PORTFOLIOS_SELECT } from '../constants/portfolios'

export const initialState = {
    portfolios: portfoliosData,
    selected: null
}


const portfolios = (state = initialState, action) => {
    switch(action.type) {
        case PORTFOLIOS_SELECT:
            return {
                ...state,
                selected: action.id ? action.id : null
            };
        default:
                return state;
    } 
}

export default portfolios;