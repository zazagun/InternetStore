import React, {useState} from "react";
import { FormControl, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createType } from "../../http/deviceAPI";

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState("");

    const addType = () => {
        createType({ name: value })
            .then(() => {
                setValue("")
                onHide()
            })
            .catch((error) => {
                alert(`Error: ${error.response?.data?.message || error.message}`)
            });
    };

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
                    Add new type
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
                <Button variant={"outline-success"} onClick={(addType)}>Add</Button>
            </Modal.Footer>

        </Modal>
        
    )
}

export default CreateType;