import React, { useEffect } from "react";
import { Context } from "../index";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { addDevice, fetchFromBasket, deleteDevice } from "../http/deviceAPI"

const Basket = () =>{
    const { device } = useContext(Context)
    console.log(device)


    return (
        <Container>
            <p>add basket in the future</p>
        </Container>
    )
}

export default Basket;