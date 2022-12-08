import React, { useEffect } from "react";
import { redirect } from 'react-router-dom'

function Redirect({ to })
{
    useEffect(() =>
    {
        redirect(to);

        return () =>
        {
            redirect(to);
        }
    }, []);

    return(
        <>
        </>
    );
}

export default Redirect;