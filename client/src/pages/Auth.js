import React from "react";
import Card from 'react-bootstrap/Card'
import { Form, Container, Button}  from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { REGISTRATION_ROUTE } from "../utils/consts";

const Auth = () =>{
    const location = useLocation()
    // console.log(location)

    const isLogin = location.pathname === REGISTRATION_ROUTE

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-4">
                <h2 className="mb-4 m-auto">Авторизация</h2>
                <Form className="d-flex flex-column" >
                    <Form.Control 
                        className = "mt-2"
                        placeholder = "Enter your email"
                    />
                    <Form.Control 
                        className = "mt-2"
                        placeholder = "Enter your password"
                    />
                    <Button className="mt-3">
                        Log in
                    </Button>
                    <Container className="d-flex mt-3">
                        <p>
                            Нет аккаунта?{" "}
                            <Link to={REGISTRATION_ROUTE}>Зарегистрируйтесь</Link>
                        </p>
                    </Container>
                </Form>
            </Card>
        </Container>
    )
}

export default Auth;