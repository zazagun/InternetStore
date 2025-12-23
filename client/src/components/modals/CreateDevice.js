import React, { useContext, useState } from "react";
import { Form, Dropdown, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

//2.24.26

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [info, setInfo] = useState([])

    const addInfo = () =>{
        setInfo([...info, {title: "", description: "", number: Date.now()}])
    }
    const removeinfo = (number) => {
        setInfo(info.filter(item => item.number !== number))
    }

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
                    <Dropdown.Toggle>Choice type</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.types.map(type => 
                            <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                        )}    
                    </Dropdown.Menu>{/*1.57.25*/}
                </Dropdown>
                <Dropdown className="d-flex mt-2 mb-2">
                    <Dropdown.Toggle>Choice brand</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.brands.map(brand => 
                            <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
                        )}    
                    </Dropdown.Menu>{/*1.57.25*/}
                </Dropdown>

                <Form.Control
                    className="mt-3"
                    placeholder="Enter device name"
                />
                <Form.Control
                    className="mt-3"
                    placeholder="Enter the price"
                />
                <Form.Control
                    className="mt-3"
                    type="file"
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
                                placeholder="Enter name of property"
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control 
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
            <Button variant={"outline-success"} onClick={(onHide)}>Add</Button>
        </Modal.Footer>

        </Modal>
        
        
    )
})

export default CreateDevice;