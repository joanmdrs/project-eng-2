import "./Login.css";
import React from "react";
import {useJwt} from "react-jwt";
import 'bootstrap/dist/css/bootstrap.min.css';
import img from "../../assets/img/image-home.svg";
import { FormGroup, Label, Input, Button } from 'reactstrap'
import { useNavigate } from "react-router-dom";
import { hasAuthorization, IsAuthenticate, persistToken, signIn } from "../../services/LoginServices";


export default function Login() {

    const token = localStorage.getItem('token');
    const { decodedToken } = useJwt(token);
    const history = useNavigate();
    
    const handleSignIn = async () => {

        signIn().then((response) => {
            persistToken(response.data.token);
            history("/home");

        }).catch((error) => {
            console.log("DEU MERDA");
        });
        
    }

    return (
        <div className="grid-container-primary">
            <div className="box-top"></div>
            <div className="box-bottom"></div>
            <div className="grid-container-secondary">
                <div className="box-left">
                    <h3 className="text-align">Sign in</h3>
                    <FormGroup>
                        <Label 
                            for="username">
                            username or e-mail
                        </Label>
                        <Input 
                            id="username" 
                            name="username" 
                            className="input username"
                            type="text"
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label 
                            for="password">
                            password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            className="input password"
                            type="password"
                        ></Input>
                        <span>forgot password ?</span>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            id="remember-me"
                            name="remember-me"
                            className="input checkbox"
                            type="checkbox"
                        ></Input>
                        Remember me
                    </FormGroup>
                    <Button 
                        id="button-sign-in"
                        name="button-sign-in"
                        className="button-sign-in"
                        type="submit"
                        onClick = {handleSignIn}> 
                        Sign in
                    </Button>
                    <p className="text-align"> 
                        Don't have an account ? 
                        <span> Sign up</span>
                    </p>
                </div>
                <div className="box-right">
                    <div className="container-img">
                        <img src={img} alt="ilustration-doctors" />
                    </div>
                    <div className="container-text">
                        <h3 className="text-align">Schedule your appointments</h3>
                        <p className="text-align">
                        Manage your medical clinic with a system 
                        that works entirely on the Web.
                        </p>
                    </div>
                    <div className="grid-container-third">
                        <div className="item-1"></div>
                        <div className="item-2"></div>
                        <div className="item-3"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}