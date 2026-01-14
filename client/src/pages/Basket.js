import React from "react";
import { Container } from "react-bootstrap";
import BasketItem from "../components/BasketItem";

const Basket = () => {
    return (
        <Container>
            <h2>Basket</h2>
            <BasketItem />
        </Container>
    );
};

export default Basket;