import React from "react";
import { Container } from "react-bootstrap";
import BasketItems from "../components/BasketItems";
import { Helmet } from "react-helmet"


const Basket = () => {
    return (
        <>
            <Helmet>
                <title>Basket</title>
            </Helmet>

            <Container>
                <h2>Basket</h2>
                <BasketItems />
            </Container>
        </>
    );
};

export default Basket;