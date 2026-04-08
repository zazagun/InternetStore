import React, { useEffect, useState, useContext} from "react";
import { Container, Col, Image, Row, Card, Button, Dropdown, ButtonGroup } from "react-bootstrap";
import bigStar from "../assets/big_star.svg";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOneDevices, addRating, getTotalRatesOneDevice } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { addDevice } from "../http/deviceAPI"
import { Helmet } from "react-helmet"
import { SHOP_ROUTE } from "../utils/consts";


const DevicePage = observer(() =>{
    const [device, setDevice] = useState({info: []})
    const { id } = useParams()
    const { user } = useContext(Context)
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [ratingError, setRatingError] = useState("")
    const [ratingSuccess, setRatingSuccess] = useState("")
    const [rating, setRating] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        fetchOneDevices(id)
            .then((data) => {
                if (!data) {
                    navigate(SHOP_ROUTE)
                } else{
                    setDevice(data)
                }
            })
            .catch((err) => {
                console.error("Ошибка при загрузке устройства:", err)
                navigate(SHOP_ROUTE)
            });
    }, [id, navigate])


    useEffect(() => {
    if (id) {
        getTotalRatesOneDevice(id)
            .then((averageRating) => {
                setRating(averageRating)
            })
            .catch((err) => {
                console.error("Ошибка при получении рейтинга:", err)
            })
    }
    }, [id])


    const toUpperLetterOfName = () => {
        if (!device.name) return ""
        return device.name.charAt(0).toUpperCase() + device.name.slice(1)
    }


    const handleAddToBasket = async () => {
        setError("")
        setSuccessMessage("")
        if (!user.isAuth) {
            return;
        }
        try {
            await addDevice(id)
            setSuccessMessage("Устройство успешно добавлено в корзину!")
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message === "device in the basket") {
                setError("Устройство уже в корзине");
            } else {
                console.error("Ошибка при добавлении в корзину:", error);
                setError(error.response?.data?.message || "Произошла ошибка");
            }
        }
    }


    const handleRateDevice = async (rating) => {
        setRatingError("");
        setRatingSuccess("")
        if (!user.isAuth) {
            setRatingError("Для оценки товара необходимо авторизоваться")
            return;
        }
        try {
            const response = await addRating(id, rating)
            setRatingSuccess("Спасибо за вашу оценку!")
            console.log("Оценка успешно добавлена:", response)

            getTotalRatesOneDevice(id)
            .then((averageRating) => {
                setRating(averageRating)
            })
            .catch((err) => {
                console.error("Ошибка при получении рейтинга:", err)
            })
        } catch (error) {
            console.error("Ошибка при добавлении оценки:", error)
            setRatingError(error.response?.data?.message || "Произошла ошибка при добавлении оценки");
        }
    }

    return (
        <>
        <Helmet>
            <title>{toUpperLetterOfName()}</title>
        </Helmet>

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
                            style={{background: `url(${bigStar}) no-repeat center center`, width: 220, height:220, backgroundsize: "cover", fontSize: 64}}
                        >
                            {rating.toFixed(1)}
                        </div>

                        {user.isAuth ?
                                <div className="mt-2">
                                    <Dropdown drop="down" className="d-flex justify-content-center">
                                        <Dropdown.Toggle variant="light" id="dropdown-rating">
                                            Оценить товар
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <ButtonGroup className="d-flex flex-row justify-content-between p-2">
                                                {[0, 1, 2, 3, 4, 5].map((rating) => (
                                                    <Button
                                                        key={rating}
                                                        variant="outline-secondary"
                                                        onClick={() => handleRateDevice(rating)}
                                                        className="mx-1"
                                                        style={{ borderRadius: 5, justifyContent: "center", alignContent: "center" }}
                                                    >
                                                        {rating}
                                                    </Button>
                                                ))}
                                            </ButtonGroup>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <div className="d-flex justify-content-center mt-3">
                                        {ratingError && <p className="text-danger mt-2">{ratingError}</p>}
                                        {ratingSuccess && <p className="text-success mt-2">{ratingSuccess}</p>}
                                    </div>
                                    
                                </div>

                                :

                                <></>
                            }
                            
                            

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

                        <Row className="d-flex justify-content-center mt-1" style={{ fontSize: 16, width: '100%' }}>
                            {error && <p className="text-danger mb-0 text-center">{error}</p>}
                            {successMessage && <p className="text-success mb-0 text-center">{successMessage}</p>}
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
    </>
    )
})

export default DevicePage;