import {makeAutoObservbable} from "mobx"

export default class UserStore{
    constructor(){
        this._isAuth = false
        this._user = {}
        makeAutoObservbable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this.user = user
    }
}

//1.21.00