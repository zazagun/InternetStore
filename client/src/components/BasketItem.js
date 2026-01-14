import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { fetchFromBasket, deleteDevice } from "../http/deviceAPI";
import { Context } from "../index";

const BasketItem = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        fetchFromBasket()
            .then((data) => {
                device.setBasketDevices(data);
            })
            .catch((error) => {
                console.error("Ошибка при получении устройств из корзины:", error);
            });
    }, [device]);

    const handleDelete = async (deviceId) => {
        try {
            await deleteDevice(deviceId);
            const updatedDevices = await fetchFromBasket();
            device.setBasketDevices(updatedDevices);
        } catch (error) {
            console.error("Ошибка при удалении устройства:", error);
        }
    };

    return (
        <div>
            {device.basketDevices.length > 0 ? (
                device.basketDevices.map((basketDevice) => (
                    <div key={basketDevice.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
                        <p>Name: {basketDevice.device.name}</p>
                        <p>Price: <strong>{basketDevice.device.price}</strong> Руб.</p>
                        <button onClick={() => handleDelete(basketDevice.id)}>Удалить</button>
                    </div>
                ))//переделать UI
            ) : (
                <p>Корзина пуста</p>
            )}
        </div>
    );
});

export default BasketItem;
