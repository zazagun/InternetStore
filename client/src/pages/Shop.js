import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DevicesList";
import { observer } from "mobx-react-lite";
import { Context } from "../index.js";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";

//2.33.06

const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes()
            .then(data => device.setTypes(data))

        fetchBrands()
            .then(data => device.setBrands(data))

        fetchDevices()
            .then(data => device.setDevices(data))
    }, [])

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
})

export default Shop;