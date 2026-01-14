import React, { useEffect, useState, useContext} from "react";
import { Container, Col, Image, Row, Card, Button } from "react-bootstrap";
import bigStar from "../assets/big_star.svg";
import { useParams } from "react-router-dom";
import { fetchOneDevices } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { addDevice } from "../http/deviceAPI"

const DevicePage = observer(() =>{
    const [device, setDevice] = useState({info: []})
    const { id } = useParams()
    const { user } = useContext(Context)
    const [error, setError] = useState("")

    useEffect(() => {
        fetchOneDevices(id)
            .then(data => setDevice(data))
    }, [id])

    const toUpperLetterOfName = () => {
        if (!device.name) return ""
        return device.name.charAt(0).toUpperCase() + device.name.slice(1)
    }

    const handleAddToBasket = async () => {
        setError("")
        if (!user.isAuth) {
            return;
        }
        try {
            await addDevice(id)
        } catch (error) {
            console.log("устройство уже добавлено")//доделать в UI
            console.error("Ошибка при добавлении в корзину:", error)
            setError(error.response?.data?.message || "Произошла ошибка")
        }
    }

    return (
        <Container className="mt-4">
            <Row className="align-items-center">
                <Col md={4} className="d-flex justify-content-center">
                    <Image src={process.env.REACT_APP_API_URL + "/" + device.img} width={300} height={300} style={{ display: "flex", alignItems: "center"}}/>
                </Col>

                <Col md={4} className="d-flex justify-content-center">
                    <Row className="d-flex flex-column align-items-center" style={{display: 'flex', alignItems: "center"}}>
                        <h2 className="d-flex flex-column align-items-center">{toUpperLetterOfName()}</h2>
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
                        style={{width: 300, height: 300, fontSize: 30}}
                    >
                        <h3>{device.price} Рублей</h3>
                        <Button 
                            onClick={handleAddToBasket}
                            style={{
                                marginBottom: 0
                            }}
                        >
                            Добавить в корзину
                        </Button>

                        <Row className="d-flex mt-1" style={{
                            fontSize: 20
                        }}>
                            {error && <p className="text-danger mt-2">{error}</p>}
                        </Row>

                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h2>Характеристики</h2>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? "#8792a0ff" : "transparent", padding: 10}}>
                        {info.title + ": " + info.description}
                    </Row>
                )}
            </Row>
        </Container>
    )
})

export default DevicePage;