import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import {useHistory,Link} from 'react-router-dom';
import logo from './logo.png';
import { Auth } from 'aws-amplify';

const Home= ()=>{
    const history= useHistory();

    const [signedIn, setSignedIn] = useState<boolean>(false)
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false)

    function handleLogout(){
        Auth.signOut()
        .then(response => {
            history.push('/');
           
        }).catch(err => {
            console.log(err);
        })
}

useEffect(()=>{
    setIsSigningIn(true)
    Auth.currentSession()
        .then(responseUserSession => {
            alert("Usuário conectado!")
            setSignedIn(true)
            setIsSigningIn(false)
            history.push("/Home")
        })
        .catch(err => {
           
            if(err === "No current user"){
                setSignedIn(false)
                history.push('/')
            }
        });
}, []);


    return(
        <>
        {signedIn &&
        <div className="col-sm-4 bg-light text-center offset-sm-4 mt-5 rounded pt-3 pb-3">

        <div className="row justify-content-center mt-4 mb-5">
            <p className="h1" style={{color: "rgba(227, 32, 49, 1)"}}>Welcome</p>

            <div className="row justify-content-center mt-3 mb-2">
                <img src={logo} style={{width:'48%', height: '96%'}} alt="logo"/>
            </div>

            <Link to="/">
                <button onClick={handleLogout} className="btn btn-danger">
                    Deslogar
                </button>
            </Link>

        </div>

    </div>
        }
        </>
    )
}
export default Home;