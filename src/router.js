import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';


class Rout extends Component {

    render() {
        return (
            <BrowserRouter>
                <Route path="/" component={App}/>
            </BrowserRouter>
        );
    }
}

export default Rout;