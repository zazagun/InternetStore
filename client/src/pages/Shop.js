import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DevicesList";
import { observer } from "mobx-react-lite";
import { Context } from "../index.js";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import Pages from "../components/Pages.js";

const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes()
            .then(data => device.setTypes(data))

        fetchBrands()
            .then(data => device.setBrands(data))

        fetchDevices()
            .then(data => {
                device.setDevices(data.rows) 
                device.setTotalCount(data.count)
            })
    }, [device])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit)
            .then(data => {
                device.setDevices(data.rows)
                device.setTotalCount(data.count)
            })
    }, [device.page, device.selectedType, device.selectedBrand, device])

    return (
        <Container>
            <Row className="d-flex mt-2" style={{ padding: "20px"}} >
                <Col md={2}>
                    <TypeBar />
                </Col>
                <Col md={10}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    )
})

export default Shop;