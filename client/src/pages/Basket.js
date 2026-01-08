import React from "react";
import { Context } from "../index";
import { useContext } from "react";
import { Container } from "react-bootstrap";

const Basket = () =>{
    const { device } = useContext(Context)

    return (
        <Container>
            <p>add basket in the future</p>
        </Container>
    )
}

export default Basket;