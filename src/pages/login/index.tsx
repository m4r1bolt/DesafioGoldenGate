import React, { ChangeEvent, FormEvent, useState } from 'react';
import {useHistory,Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Auth} from 'aws-amplify';

import logo from './logo.png';


const Login= ()=>{
    const history= useHistory();

    const [formData, setFormData] = useState({
        username:'',
        password:'',
    });

    function handleSubmit(event:FormEvent){
        event.preventDefault()
    
        const{username, password}=formData;
        Auth.signIn({username, password})
        .then(responseCognitoUser => {
            Auth.currentSession()
            .then(responseUserSession => {
                alert("Login feito com sucesso!")
                history.push('/Home')
            })
            .catch(err => {
                alert("Nao foi possivel se conectar" + err.code)
            })
        })
        .catch(err => {
            if(err.code === "NotAuthorizedException"){
                alert("Usuário ou senha incorretos!")
            }
        })

    } 

    function handleInputChange(event:ChangeEvent<HTMLInputElement>){
        const {name, value}= event.target
        setFormData({...formData, [name]:value});
    }
   

    return(
        <div className="col-sm-4 bg-light text-center offset-sm-4 mt-5 rounded pt-3 pb-3">
           
           <div className="row justify-content-center mt-5 mb-5">
                        <img src={logo} style={{width:'25%', height: '25%',  minWidth: '80px', minHeight: '50px'}} alt="logo"/>
          </div>
             <div className="row justify-content-center mt-2 mb-5">
                <form className="text-center" onSubmit={handleSubmit}>
                   
                    <div className="form-group pr-5 pl-5">
                        <div className="camposlog">
                            <label className="text-danger" htmlFor="username">Digite um usuario</label>
                                <input className="form-control"
                                    type="text" 
                                    name="username" 
                                    id="username"
                                    onChange= {handleInputChange}
                                    required
                                />
                        </div>
                     </div>

                     <div className="form-group pr-5 pl-5">
                        <div className="camposlog">
                            <label className="text-danger" htmlFor="password">Digite a senha</label>
                                <input className="form-control" 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    onChange= {handleInputChange}
                                    required
                                />
                        </div>
                        </div>

                        <button type= "submit" className="btn btn-danger">Enviar</button>

                        <main>
                                    Ainda nao é cadastrado? 
                                    <Link to="/cadastro">
                                        <span className="mr-2">
                                            Registre-se.
                                        </span>
                                    </Link>
                                    <br></br>

                                    <Link to="/confirma">
                                        <span>
                                            Verifique sua conta aqui!
                                        </span>
                                    </Link>
                                </main>


                        
                    </form>
                </div>

       </div> 

    

    )
}
export default Login;