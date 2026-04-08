import { Card, Col, Image } from "react-bootstrap";
import star from "../assets/star_rating.svg"
import { useParams, useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../index.js";
import { getTotalRatesOneDevice } from "../http/deviceAPI.js"

const DeviceItem = ({device}) => {
    const { device: deviceContext } = useContext(Context)
    const navigate = useNavigate()
    const [rating, setRating] = useState(0)
    const { id } = useParams()

    const toUpperLetterOfName = () => {
        if (!device.name) return ""
        return device.name.charAt(0).toUpperCase() + device.name.slice(1)
    }

    const getBrandName = (brandId) => {
        const brand = deviceContext.brands.find(brand => brand.id === brandId)
        return brand ? brand.name : "unknown brand"
    }


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

    return(
        <Col md={3}  className="mt-4" onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}>
            <Card style={{width: 170, cursor: "pointer"}} border={"gray"}>
                <Image src={process.env.REACT_APP_API_URL + "/" + device.img}
                    width={167} height={165}
                />

                <div className="text-black-50 d-flex justify-content-between align-items-center">
                    {getBrandName(device.brandId)}
                    <div className="d-flex align-items-center">
                        <div>{rating.toFixed(1)}</div>
                        <Image src={star} width={20} height={20} />
                    </div>
                </div>

                <hr style={{width: "70%", justifyContent: "center", alignItems:"center", margin: "5px auto"}}/>
                
                <div>
                    {toUpperLetterOfName()}
                </div>

                <div>
                    {device.price + " Руб."}
                </div>
            </Card>
        </Col>
    )
};

export default DeviceItem;