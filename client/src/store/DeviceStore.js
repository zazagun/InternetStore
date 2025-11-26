import {makeAutoObservable} from "mobx"

export default class DeviceStore{
    constructor(){
        this._types = [
            {id: 1, name: "Телефоны"},
            {id: 2, name: "Видеокарты"},
            {id: 3, name: "Наушники"},
            {id: 4, name: "Ноутбуки"},
            {id: 5, name: "Мыши"}
        ]
        this._brands = [
            {id: 1, name: "Apple"},
            {id: 2, name: "MSI"},
            {id: 3, name: "Lenovo"},
            {id: 4, name: "Samsung"},
            {id: 5, name: "ASUS"},
            {id: 6, name: "Logitech"},
        ]
        this._devices = [
            {id: 1, name: "Msi Gforce some666", price: 25000, rating: 4, img: "https://c.dns-shop.ru/thumb/st1/fit/300/300/aea0c2c3767fa91b5f7fa40dec0cc1bd/80b4a85d0136a567c8c4bd9ea4a38144da172877a39aae566ddfa9730435769d.jpg.webp"},
            {id: 2, name: "Msi Gforce somethink", price: 40000, rating: 4, img: "https://c.dns-shop.ru/thumb/st1/fit/300/300/aea0c2c3767fa91b5f7fa40dec0cc1bd/80b4a85d0136a567c8c4bd9ea4a38144da172877a39aae566ddfa9730435769d.jpg.webp"},
            {id: 3, name: "Asus some", price: 35000, rating: 4, img: "https://c.dns-shop.ru/thumb/st1/fit/300/300/aea0c2c3767fa91b5f7fa40dec0cc1bd/80b4a85d0136a567c8c4bd9ea4a38144da172877a39aae566ddfa9730435769d.jpg.webp"},
            {id: 4, name: "Palit", price: 15000, rating: 4, img: "https://c.dns-shop.ru/thumb/st1/fit/300/300/aea0c2c3767fa91b5f7fa40dec0cc1bd/80b4a85d0136a567c8c4bd9ea4a38144da172877a39aae566ddfa9730435769d.jpg.webp"},
        ]

        this._selectedType = {}
        this._selectedBrand = {}
        makeAutoObservable(this)
    }

    setTypes(types){
        this._types = types
    }
    setBrands(brands){
        this._brands = brands
    }
    setDevices(devices){
        this._devices = devices
    }
    setSelectedType(type){
        this._selectedType = type
    }
    setSelectedBrand(brand){
        this._selectedBrand = brand
    }
    //get
    get types(){
        return this._types
    }
    get brands(){
        return this._brands
    }
    get devices(){
        return this._devices
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedBrand(){
        return this._selectedBrand
    }
}