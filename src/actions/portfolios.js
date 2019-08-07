import { PORTFOLIOS_SELECT } from '../constants/portfolios'

export const selectPortfolio = (portfolio) => ({
    type: PORTFOLIOS_SELECT,
    portfolio
});
