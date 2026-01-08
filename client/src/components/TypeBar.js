import React, { useContext, useState } from "react";
import { observer } from 'mobx-react-lite';
import { Context } from "../index.js";
import { ListGroup } from "react-bootstrap";

const TypeBar = observer(() => {
    const { device } = useContext(Context);
    const [isClearActive, setIsClearActive] = useState(false);

    const handleClearFilters = () => {
        device.setSelectedType({});
        setIsClearActive(true); 
        setTimeout(() => setIsClearActive(false), 250);
    };

    const toUpperLetterOfName = (name) => {
        if (!name) return ""
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    return (
        <ListGroup  style={{ width: 'fit-content', marginLeft: -20}}>
            {device.types.map((type) => (
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={type.id === device.selectedType?.id}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                >
                    {toUpperLetterOfName(type.name)}
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
