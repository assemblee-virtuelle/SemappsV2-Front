import { pseudoRandomBytes } from "crypto";
import qs from 'qs';


export default class MainModel {

    constructor(mainChannel){
        this.channel = mainChannel;
    }

    subscribeAll(){
        this._getRegister();
        this._getLogin();
    }

    _getRegister(){
        this.channel.subscribe({
            topic: 'register',
            callback: (data) => {
                console.log("register");
                fetch("http://localhost:3000/v1/auth/new", {
                    method:'POST',
                    headers:{
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    body:qs.stringify(data)
                })
                .then(response => {
                    console.log('response.status :', response.status);
                    if (response.status == 409) {
                        this.channel.publish ({
                            topic: "regResponse",
                            data: "alreadyExist"
                        })
                    }
                    else {
                        this.channel.publish ({
                            topic: "regResponse",
                            data: "done"
                        })
                    }
                    return response.json()
                })
                .then(json => {
                    localStorage.setItem('id', json.id);
                    console.log('json :', json);
                })
                .catch(err => console.log('err :', err))
            }
        });
    }

    _getLogin(){
        this.channel.subscribe({
            topic: 'login',
            callback: (data) => {
                console.log("login");
                fetch("http://localhost:3000/v1/auth/login", {
                    method:'POST',
                    headers:{
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    body:qs.stringify(data)
                })
                .then(response => {
                    console.log('response.status :', response.status);
                    return response.json()
                })
                .then(json => {
                    localStorage.setItem('id', json.id);
                    console.log('json :', json);
                })
                .catch(err => console.log('err :', err))
            }
        });
    }
}