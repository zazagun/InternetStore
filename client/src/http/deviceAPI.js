import { $authHost, $host } from "./index";

//типы
export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type')
    return data
}

//брэнды
export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand')
    return data
}

//девайсы
export const createDevice = async (device) => {
    const { data } = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit = 8) => {
    const { data } = await $host.get('api/device',{params: {//change
        typeId, brandId, page, limit
    }})
    return data
}

export const fetchOneDevices = async (id) => {
    const { data } = await $host.get('api/device/' + id)
    return data
}

//basket
export const addDevice = async (deviceId) => {
    const { data } = await $authHost.post("api/basket", {deviceId})
    return data
}

export const fetchFromBasket = async () => {
    const { data } = await $authHost.get('api/basket')
    return data
}

export const deleteDevice = async (deviceId) => {
    const { data } = await $authHost.delete('api/basket',  { data: { deviceId } })
    return data
}