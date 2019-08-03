import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import HomeContainer from "../containers/homeContainer"
import RecomendContainer from "../containers/recomendContainer"


const Router = () => (
    <BrowserRouter>
        <Route path="/recomend" component={RecomendContainer} />
        <Route path='/' exact component={HomeContainer}/> 
    </BrowserRouter>
);

export default Router;
