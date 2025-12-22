import React, { useState } from "react";
import { FormControl, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createBrand } from "../../http/deviceAPI";


const CreateBrand = ({show, onHide}) => {
    const [value, setValue] = useState("")

    const addBrand = () => {
        createBrand({name: value})
            .then(() => {
                setValue("")
                onHide()
            })
            .catch((error) => {
                alert(`Error: ${error.response?.data?.message || error.message}`)
            })
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
                Add new brand
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <FormControl 
                    placeholder={"Enter the type name"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant={"outline-dark"} onClick={(onHide)}>Close</Button>
            <Button variant={"outline-success"} onClick={(addBrand)}>Add</Button>
        </Modal.Footer>

        </Modal>
        
        
    )
}

export default CreateBrand;