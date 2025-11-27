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
            {id: 1, name: "Coogar aquarius", price: 25000, rating: 2, img: "https://c.dns-shop.ru/thumb/st1/fit/500/500/b628cd14fd7118e7d6f77ca61ee494b4/14b2eee2fabde645bf6ab14ec3707bb820f4c73ce2a1b3cbb90a7d04e05a7cfd.jpg.webp"},
            {id: 2, name: "Msi Gforce", price: 40000, rating: 4, img: "https://c.dns-shop.ru/thumb/st1/fit/300/300/aea0c2c3767fa91b5f7fa40dec0cc1bd/80b4a85d0136a567c8c4bd9ea4a38144da172877a39aae566ddfa9730435769d.jpg.webp"},
            {id: 3, name: "Asus some", price: 35000, rating: 3, img: "https://c.dns-shop.ru/thumb/st1/fit/500/500/207572588eb80475db54c6435a18beeb/df069fba111b4406c32acd081a1a30e375a7f60bb101cdd95c6db8c432edc933.jpg.webp"},
            {id: 4, name: "Mega Gforse", price: 15000, rating: 4, img: "https://c.dns-shop.ru/thumb/st1/fit/300/300/aea0c2c3767fa91b5f7fa40dec0cc1bd/80b4a85d0136a567c8c4bd9ea4a38144da172877a39aae566ddfa9730435769d.jpg.webp"},
            {id: 5, name: "Asus some", price: 35000, rating: 5, img: "https://c.dns-shop.ru/thumb/st1/fit/500/500/207572588eb80475db54c6435a18beeb/df069fba111b4406c32acd081a1a30e375a7f60bb101cdd95c6db8c432edc933.jpg.webp"},
            {id: 6, name: "Mega Gforse", price: 15000, rating: 4, img: "https://c.dns-shop.ru/thumb/st1/fit/320/250/558b759b2dd89cb8319e1b5f2277dcf0/7e9d8e31bd98333b1373068b554d8a475c064eeca19355237237ecc6431f649a.jpg"},
        
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