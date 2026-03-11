import React from "react";
import { Container } from "react-bootstrap";
import BasketItems from "../components/BasketItems";

const Basket = () => {
    return (
        <Container>
            <h2>Basket</h2>
            <BasketItems />
        </Container>
    );
};

export default Basket;