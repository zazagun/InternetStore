import React from "react";
import { Container, Col, Image } from "react-bootstrap";

const DevicePage = () =>{
    const device = {
        id: 2,
        name: "Msi Gforce",
        price: 40000,
        rating: 4, 
        img: "https://c.dns-shop.ru/thumb/st1/fit/300/300/aea0c2c3767fa91b5f7fa40dec0cc1bd/80b4a85d0136a567c8c4bd9ea4a38144da172877a39aae566ddfa9730435769d.jpg.webp"
    }

    return (
        <Container className="mt-4">
            <Col md={4}>
                <Image src={device.img} width={300} height={300}/>
            </Col>
            <Col md={4}>
                <h2>{device.name}</h2>
                <div
                    className="d-flex align-items-center justify-content-center"
                >
                    {device.rating}
                </div>
            </Col>
            <Col md={4}>

            </Col>
        </Container>
    )
}

export default DevicePage;