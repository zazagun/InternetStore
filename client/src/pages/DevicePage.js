import React from "react";
import { Container, Col, Image, Row, Card, Button } from "react-bootstrap";
import bigStar from "../assets/big_star.svg"

const DevicePage = () =>{
    const device = {
        id: 2,
        name: "Msi Gforce",
        price: 40000,
        rating: 4.1, 
        img: "https://c.dns-shop.ru/thumb/st1/fit/300/300/aea0c2c3767fa91b5f7fa40dec0cc1bd/80b4a85d0136a567c8c4bd9ea4a38144da172877a39aae566ddfa9730435769d.jpg.webp"
    }
    const description = [
        {id: 1, title: "Видеопамять", description: "8 гб"},
        {id: 2, title: "Шина", description: "128 бит"},
        {id: 3, title: "Цвет", description: "белый"},
        {id: 4, title: "Потребление", description: "150 ВТ"},
        {id: 5, title: "Количество куллеров", description: "3"},
    ]

    return (
        <Container className="mt-4">
            <Row className="align-items-center">
                <Col md={4} className="d-flex justify-content-center">
                    <Image src={device.img} width={300} height={300} style={{ display: "flex", alignItems: "center"}}/>
                </Col>

                <Col md={4} className="d-flex justify-content-center">
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

                <Col md={4} className="d-flex justify-content-center">
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32}}
                    >
                        <h3>{device.price} Рубелей</h3>
                        <Button >Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h2>Характеристики</h2>
                {description.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? "#8792a0ff" : "transparent", padding: 10}}>
                        {info.title + ": " + info.description}
                    </Row>
                )}
            </Row>
        </Container>
    )
}

export default DevicePage;