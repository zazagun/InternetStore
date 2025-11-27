import React, { useContext, useState } from "react";
import { observer } from 'mobx-react-lite';
import { Context } from "../index.js";
import { ListGroup } from "react-bootstrap";

const TypeBar = observer(() => {
    const { device } = useContext(Context);
    const [isClearActive, setIsClearActive] = useState(false);

    const handleClearFilters = () => {
        device.setSelectedType(null);
        setIsClearActive(true); 
        setTimeout(() => setIsClearActive(false), 250);
    };

    return (
        <ListGroup>
            {device.types.map((type) => (
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={type.id === device.selectedType?.id}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            ))}
            <ListGroup.Item
                active={isClearActive}
                onClick={handleClearFilters}
                style={{ cursor: "pointer"}}
            >
                Сlear the filters
            </ListGroup.Item>
        </ListGroup>
    );
});

export default TypeBar;
