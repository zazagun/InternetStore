import React, { useState } from "react";
import Card from 'react-bootstrap/Card'
import { Form, Container, Button}  from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userApi";

const Auth = () =>{
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const click = async () => {
        if(isLogin){
            const response = await login()
            console.log(response)
        }else{
            const response = await registration(email, password)
            console.log(response)
        }//2.07.40
    }

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{marginTop: "16vh"}}
        >
            <Card style={{width: 600}} className="p-4">
                <h2 className="mb-4 m-auto">{isLogin ? "Authorization": "Registration"}</h2>
                <Form className="d-flex flex-column" >
                    <Form.Control 
                        className = "mt-2"
                        placeholder = "Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control 
                        className = "mt-2"
                        type="password"
                        placeholder = "Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {isLogin ? 
                        <Button className="mt-3">
                            Log in
                        </Button>:
                        <Button className="mt-3">
                            Register
                        </Button>
                    }
                    
                    <Container className="d-flex mt-3">
                        {isLogin ? <p>
                            Dont have account?{" "}
                            <Link to={REGISTRATION_ROUTE}>Registration</Link>
                        </p>:
                            <p>
                                Have account?{" "}
                                <Link to={LOGIN_ROUTE}>Log In</Link>
                            </p>
                        }
                    </Container>
                </Form>
            </Card>
        </Container>
    )
}

export default Auth;