import React from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";

const Shop = () =>{
    console.log("Shop component rendered");
    return (
        <Container>
            <Row>
                <Col md={3}>
                    SHOP
                </Col>
            </Row>
        </Container>
    )
}

export default Shop;