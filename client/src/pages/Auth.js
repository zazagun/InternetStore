import React, { useContext, useState, useRef, useEffect} from "react";
import Card from 'react-bootstrap/Card'
import { Form, Container, Button, Row}  from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userApi";
import { observer } from 'mobx-react-lite';
import { Context } from "../index";
import { useNavigate } from "react-router-dom";

const Auth = observer(() =>{
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");

    const click = async () => {
        try{
            let data
            if(isLogin){
                data = await login(email, password)
                console.log(data)

            }else{
                data = await registration(email, password)
                console.log(data)
            }
            
        user.setUser(user)
        user.setIsAuth(true)
        navigate(SHOP_ROUTE)

        setEmail("")
        setPassword("")
        setError("")

        }catch(error){
            setError(error.response?.data?.message || "Произошла ошибка");
        }
    }

    //активный инпут и enter
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    useEffect(() => {
        emailRef.current.focus()
    }, [])

     const handleEmailKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            passwordRef.current.focus()
        }
    }

    const handlePasswordKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            click()
        }
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
                        ref={emailRef}
                        className = "mt-2"
                        placeholder = "Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={handleEmailKeyDown}
                    />
                    <Form.Control 
                        ref={passwordRef}
                        className = "mt-2"
                        type="password"
                        placeholder = "Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={handlePasswordKeyDown}
                    />

                    <Button
                        className="mt-3"
                        onClick={click}
                    >
                        {isLogin ? "Log in" : "Register"}
                    </Button>
                    
                    <Row className="d-flex mt-2" >
                        {error && <p className="text-danger mt-2">{error}</p>}
                    </Row>

                    <Container className="d-flex" style={{marginLeft: -10}}>
                        {isLogin ? 
                            <p>
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
})

export default Auth;