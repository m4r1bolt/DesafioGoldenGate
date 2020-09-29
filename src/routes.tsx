import React from  'react'
import {BrowserRouter, Route} from 'react-router-dom';

import Login from './pages/login/index';
import Home from './pages/home/index';
import Confirma from './pages/confirma/index';
import Cadastro from './pages/cadastro/index';

const Routes= () =>{
    return ( 
        <BrowserRouter>
            <Route component={Login} path='/' exact />
            <Route component={Home} path='/home' exact />
            <Route component={Confirma} path='/confirma' exact />
            <Route component={Cadastro} path='/cadastro' exact />
         
        </BrowserRouter>
    )
}

 export default Routes;