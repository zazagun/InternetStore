import { Card, Col, Image } from "react-bootstrap";
import star from "../assets/star_rating.svg"
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({device}) => {
    const navigate = useNavigate()


    const toUpperLetterOfName = () => {
        if (!device.name) return ""
        return device.name.charAt(0).toUpperCase() + device.name.slice(1)
    }


    return(
        <Col md={3}  className="mt-4" onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}>
            <Card style={{width: 170, cursor: "pointer"}} border={"gray"}>
                <Image src={process.env.REACT_APP_API_URL + "/" + device.img}
                    width={167} height={165}
                />

                <div className="text-black-50 d-flex justify-content-between align-items-center">
                    {device.brand || "Samsung..."}
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
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