import { useContext, useState } from "react";
import { observer } from 'mobx-react-lite';
import { Context } from "../index.js";
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(() => {
    const { device } = useContext(Context);
    const [isClearActive, setIsClearActive] = useState(false);

    const handleClearFilters = () => {
        device.setSelectedBrand(null);
        setIsClearActive(true);
        setTimeout(() => setIsClearActive(false), 250);
    };

    return (
        <Row className="d-flex flex-wrap align-items-center">
            {device.brands.map(brand => (
                <Card
                    key={brand.id}
                    onClick={() => device.setSelectedBrand(brand)}
                    className="p-3 m-2"
                    style={{
                        width: 'auto',
                        cursor: "pointer",
                        height: "35px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: brand.id === device.selectedBrand?.id ? "#0d6efd" : "",
                        color: brand.id === device.selectedBrand?.id ? "white" : ""
                    }}
                >
                    {brand.name}
                </Card>
            ))}
            <Card
                onClick={handleClearFilters}
                className="p-3 m-2"
                style={{
                    width: 'auto',
                    cursor: "pointer",
                    height: "35px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isClearActive ? "#0d6efd" : "",
                    color: isClearActive ? "white" : ""
                }}
            >
                Сlear the filters
            </Card>
        </Row>
    );
});

export default BrandBar;
