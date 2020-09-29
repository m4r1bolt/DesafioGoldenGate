import React, { ChangeEvent, FormEvent, useState } from 'react';
import {useHistory,Link} from 'react-router-dom';
import logo from './logo.png';
import { Auth } from 'aws-amplify';



const Confirma= ()=>{
    const history= useHistory();

    const [formData, setFormData] = useState({
        username:'',
        confirmationCode:'',
    });

    async function handleSubmit(event:FormEvent){
        event.preventDefault()
    
        const{username, confirmationCode}=formData;
        
        await Auth.confirmSignUp(username, confirmationCode)
        .then(response => {
            if(response === "SUCCESS"){
               alert("Sua conta foi verificada. Voce ira para a pagina de login.")
                history.push('/')
            }
        })
        .catch(err =>{
            if(err.code === "ExpiredCodeException"){
                alert("O código expirou.")
            }
        })

        alert("Cadastro feito com sucesso.")
        history.push('/');

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
                <form onSubmit={handleSubmit}>
                    <div className="form-group pr-5 pl-5">
                        <div className="camposconf">
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
                        <div className="camposconf">
                            <label className="text-danger" htmlFor="confirmationCode">Confirmação de código</label>
                                <input className="form-control"
                                    type="text" 
                                    name="confirmationCode"
                                    id="confirmationCode"
                                    onChange= {handleInputChange}
                                    required
                                />
                        </div>
                        </div>

                        <button type= "submit" className="btn btn-danger">Enviar</button>
                        
                    </form>
             </div>
        

    

    )
}
export default Confirma;