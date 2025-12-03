import React from "react";
import { Container, Col, Image, Row } from "react-bootstrap";
import bigStar from "../assets/big_star.svg"

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
            <Row>
                <Col md={4}>
                    <Image src={device.img} width={300} height={300}/>
                </Col>

                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center" style={{display: 'flex', alignItems: "center"}}>
                        <h2 className="d-flex flex-column align-items-center">{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width: 240, height:240, backgroundsize: "cover", fontSize: 64}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>

                <Col md={4}>
                    <Row>

                    </Row>
                </Col>
            </Row>
            
        </Container>
    )
}

export default DevicePage;