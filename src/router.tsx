import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './styles/global.css';

//pages
import Calendar from './pages/Calendar/Calendar';
import Schedule from './pages/Schedule/Schedule'; 

export default function Router(){

    return (
        <div className="boat">
            
            <BrowserRouter>
                <Switch>
                    {/* {rota principal} */}
                    <Route exact path="/" component={Calendar} />
                    {/* { rota para agendamento } */}
                    <Route exact path="/agenda/:day/:month/:year" component={Schedule} />

                </Switch>
            </BrowserRouter>

        </div>
    );
}