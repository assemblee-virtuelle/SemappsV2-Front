import vue from 'html-loader!./vue.html';

import { Issuer } from 'openid-client';

export default class Login extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({
            mode: 'open'
          });
        this.shadowRoot.innerHTML = vue;
    }

    connectedCallback() {
        this.propagatedStyle = this.querySelectorAll('style');
        this.propagatedStyle.forEach(style => {
          let injectedStyle = document.createElement('style');
          injectedStyle.appendChild(document.createTextNode(style.innerText));
          this.shadowRoot.appendChild(injectedStyle)
        })
        this.setListeners();
    }

    setListeners(){
        //TODO: Changer ptet
        let submitBtn = this.shadowRoot.getElementById("submit");
        submitBtn.addEventListener("click", () => {
            let login = this.shadowRoot.getElementById("loginInput");
            let password = this.shadowRoot.getElementById("passwordInput");

            const avIssuer = new Issuer({
                issuer:"http://localhost:3000",
                authorization_endpoint: 'http://localhost:3000/auth',
                token_endpoint: 'http://localhost:3000/token',
                userinfo_endpoint: 'http://localhost:3000/me',
                jwks_uri: 'http://localhost:3000/certs',
            })
            console.log('Discovered issuer %s %O', avIssuer.issuer, avIssuer.metadata);
            const client = new avIssuer.Client({
                client_id: 'foo',
                client_secret: 'bar'
            }); // => Client
            console.log("eho");

            let url = client.authorizationUrl({
                redirect_uri: 'https://127.0.0.1:8086',
                scope: 'openid',
              }); // => String (URL)
            console.log('url :', url);

        });
    }

    setChannel(channel){
        this.channel = channel;
    }
}
window.customElements.define('login-wc', Login);