import { Card, Col, Image } from "react-bootstrap";
import star from "../assets/star_rating.svg"
import { useNavigate } from "react-router-dom";
//поменять useHistory 

const DeviceItem = ({device}) => {
    const navigate = useNavigate() /*1.44.55*/

    return(
        <Col md={3}  className="mt-4">
            <Card style={{width: 170, cursor: "pointer"}} border={"gray"}>
                <Image src={device.img} width={167} height={165}/>

                <div className="text-black-50 d-flex justify-content-between align-items-center">
                    Samsung...
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image src={star} width={20} height={20} />
                    </div>
                </div>

                <hr style={{width: "70%", justifyContent: "center", alignItems:"center", margin: "5px auto"}}/>
                <div>
                    {device.name}
                </div>
            </Card>
        </Col>
    )
};

export default DeviceItem;