import React from "react";
import Card from 'react-bootstrap/Card'
import { Form, Container, Button}  from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const Auth = () =>{
    const location = useLocation()
    // console.log(location)

    const isLogin = location.pathname === LOGIN_ROUTE

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-4">
                <h2 className="mb-4 m-auto">{isLogin ? "Authorization": "Registration"}</h2>
                <Form className="d-flex flex-column" >
                    <Form.Control 
                        className = "mt-2"
                        placeholder = "Enter your email"
                    />
                    <Form.Control 
                        className = "mt-2"
                        placeholder = "Enter your password"
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