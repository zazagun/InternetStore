import {makeAutoObservable} from "mobx"

export default class UserStore{
    constructor(){
        this._isAuth = false //true false
        this._userId = null
        this._email = null
        this._role = null
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUserId(id){
        this._userId = id
    }
    setEmail(email){
        this._email = email
    }
    setRole(role){
        this._role = role
    }
    logout(){
        this._userId = null
        this._email = null
        this._role = null
        this._isAuth = false
    }
    //get
    get isAuth(){
        return this._isAuth 
    }
    get userId(){
        return this._userId
    }
    get email(){
        return this._email
    }
    get role(){
        return this._role
    }
}