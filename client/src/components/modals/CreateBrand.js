import React from "react";
import { FormControl, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CreateBrand = ({show, onHide}) => {
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
                />
            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant={"outline-dark"} onClick={(onHide)}>Close</Button>
            <Button variant={"outline-success"} onClick={(onHide)}>Add</Button>
        </Modal.Footer>

        </Modal>
        
        
    )
}

export default CreateBrand;