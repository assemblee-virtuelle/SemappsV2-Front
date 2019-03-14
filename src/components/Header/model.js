import vue from 'html-loader!./vue.html';

import login from './Login/model.js';
import Register from './Register/model.js';


export default class Header extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({
            mode: 'open'
        });
        //console.log('this.channel :', this.channel);
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

    setListeners() {
        let openModalRegBtn = this.shadowRoot.getElementById('open-modal-reg');
        openModalRegBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let modal = this.shadowRoot.getElementById('reg');
            modal.style.display = 'block';
        })
        let closeModalRegBtn = this.shadowRoot.getElementById('close-modal-reg');
        closeModalRegBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let modal = this.shadowRoot.getElementById('reg');
            modal.style.display = 'none';
        })
        let modalReg = this.shadowRoot.getElementById('reg');
        this.shadowRoot.addEventListener("click", (e) => {
            if (e.target == modalReg) {
                modalReg.style.display = 'none';
            }
        })


        let openModalLogBtn = this.shadowRoot.getElementById('open-modal-log');
        openModalLogBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let modal = this.shadowRoot.getElementById('log');
            modal.style.display = 'block';
        })
        let closeModalLogBtn = this.shadowRoot.getElementById('close-modal-log');
        closeModalLogBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let modal = this.shadowRoot.getElementById('log');
            modal.style.display = 'none';
        })
        let modalLog = this.shadowRoot.getElementById('log');
        this.shadowRoot.addEventListener("click", (e) => {
            if (e.target == modalLog) {
                modalLog.style.display = 'none';
            }
        })
    }

    setChannel(channel){
        console.log("channel head", channel);
        //Register.setChannel(channel);
        let reg = this.shadowRoot.querySelector('register-wc');
        reg.setChannel(channel);
        this.channel = channel;
    }
}
window.customElements.define('header-wc', Header);