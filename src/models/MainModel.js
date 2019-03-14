import { pseudoRandomBytes } from "crypto";

export default class MainModel {

    constructor(mainChannel){
        this.channel = mainChannel;
    }

    subscribeAll(){
        this._getRegister();
    }

    _getRegister(){
        this.channel.subscribe({
            topic: 'register',
            callback: (data) => {
                console.log("register");

                fetch("http://localhost:3000/v1/auth/new", {
                    method:'POST',
                    header:{
                        "content-type": "application/json"
                    },
                    body:JSON.stringify(data)
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

    // register(){
    //     let data;

    //     fetch("http://localhost:3000/v1/auth/new", {
    //         method:'POST',
    //         body:{
    //             email:"test",
    //             password:"bite",
    //             username:"toto"
    //         }
    //     })
    //     .then(response => {
    //         console.log('response.status :', response.status);
    //         return response.json()
    //     })
    //     .then(json => {
    //         localStorage.setItem('id', json.id);
    //         console.log('json :', json);
    //     })
    //     .catch(err => console.log('err :', err))

    // }
}