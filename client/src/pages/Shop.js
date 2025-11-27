import React from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DevicesList";
// import DeviceList from "../components/DeviceList"

const Shop = () => {
    console.log("Shop component rendered");
    return (
        <Container>
            <Row className="d-flex mt-2" style={{ padding: "20px"}} >
                <Col md={2}>
                    <TypeBar />
                </Col>
                <Col md={10}>
                    <BrandBar />
                    <DeviceList />
                </Col>
            </Row>
        </Container>
    )
}

export default Shop;