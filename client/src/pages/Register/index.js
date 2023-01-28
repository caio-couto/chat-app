import React from "react";

function Register()
{
    return(
        <div>
            <input type='email' placeholder="Digite seu email" required/>
            <input type='password' placeholder="Digite sua senha" required/>
            <button type="submit">Login</button>
        </div>
    );
}

export default Register;