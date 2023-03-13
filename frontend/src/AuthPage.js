import * as React from "react";
import { useState } from "react";
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AuthPage() {
    console.log("entered Auth");
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('check') === 'true') navigate('/profile');  
    },[navigate]);

    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return(
        <div id = "Auth">
            {
                currentForm === "login" ? <SignIn onFormSwitch={toggleForm} /> : <SignUp onFormSwitch={toggleForm} />
            }
        </div>
    );
}