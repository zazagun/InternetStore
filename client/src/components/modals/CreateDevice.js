import React, { useContext, useState, useEffect } from "react";
import { Form, Dropdown, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import noImage from "../../assets/image-missing.svg"
import { fetchBrands, fetchDevices, fetchTypes } from "../../http/deviceAPI";

//2.30.53

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [info, setInfo] = useState([])
    const [name, setName] = useState()
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(noImage)
    const [brand, setBrand] = useState(null)
    const [type, setType] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addInfo = () => {
        setInfo([...info, {title: "", description: "", number: Date.now()}])
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    const removeinfo = (number) => {
        setInfo(info.filter(item => item.number !== number))
    }

    const addDevice = () => {
        console.log(info)
        onHide()
    }

    useEffect(() => {
            fetchTypes()
                .then(data => device.setTypes(data))
    
            fetchBrands()
                .then(data => device.setBrands(data))
    
            fetchDevices()
                .then(data => device.setDevices(data))
        }, [device])
    
    return (
        <Modal
            show = {show}
            onHide= {onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add new device
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <Dropdown className="d-flex mt-2 mb-2">
                    <Dropdown.Toggle>{device.selectedType.name || "Choice type"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.types.map(type => 
                            <Dropdown.Item 
                                key={type.id}
                                onClick={() => device.setSelectedType(type)}
                            >
                                {type.name}
                            </Dropdown.Item>
                        )}    
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="d-flex mt-2 mb-2">
                    <Dropdown.Toggle>{device.selectedBrand.name || "Choice brand"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.brands.map(brand => 
                            <Dropdown.Item 
                                key={brand.id}
                                onClick={() => device.setSelectedBrand(brand)}
                            >
                                {brand.name}
                            </Dropdown.Item>
                        )}    
                    </Dropdown.Menu>
                </Dropdown>

                <Form.Control
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="mt-3"
                    placeholder="Enter device name"
                />
                <Form.Control
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="mt-3"
                    placeholder="Enter the price"
                />
                <Form.Control
                    className="mt-3"
                    type="file"
                    onChange={selectFile}
                />
                <hr/>

                <Button
                    variant={"outline-dark"}
                    onClick={addInfo}
                >
                    Add a property
                </Button>
                {info.map(item => 
                    <Row className="d-flex mt-2" key={item.number}>
                        <Col md={4}>
                            <Form.Control
                                value={item.title}
                                onChange={(e) => changeInfo("title", e.target.value, item.number)}
                                placeholder="Enter name of property"
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                value={item.description}
                                onChange={(e) => changeInfo("description", e.target.value, item.number)}
                                placeholder="Enter description of property"
                            />
                        </Col>
                        <Col md={4}>
                            <Button 
                                variant={"outline-dark"}
                                onClick={() => removeinfo(item.number)}
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>
                )}
            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant={"outline-dark"} onClick={(onHide)}>Close</Button>
            <Button variant={"outline-success"} onClick={addDevice}>Add</Button>
        </Modal.Footer>

        </Modal>
        
        
    )
})

export default CreateDevice;