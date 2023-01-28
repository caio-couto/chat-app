import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";


function Login()
{
    const { login } = useContext(AuthContext);

    function handleSubmit(event)
    {
        login(event);
    };

    return(
        <form onSubmit={(event) => { handleSubmit(event) }}>
            <input type='email' name="email" placeholder="Digite seu email" required/>
            <input type='password' name="password" placeholder="Digite sua senha" required/>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;