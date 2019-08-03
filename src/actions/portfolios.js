import { PORTFOLIOS_SELECT } from '../constants/porfolios'

export const selectPortfolio = (id) => ({
    type: PORTFOLIOS_SELECT,
    id
});
