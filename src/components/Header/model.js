import vue from 'html-loader!./vue.html';

import login from './Login/model.js';
import Register from 'Components/Register/model.js';


export default class Header extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({
            mode: 'open'
        });
        console.log('this.channel :', this.channel);
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
        let openModalBtn = this.shadowRoot.getElementById('open-modal');
        openModalBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let modal = this.shadowRoot.getElementById('id01');
            modal.style.display = 'block';
        })
        let closeModalBtn = this.shadowRoot.getElementById('close-modal');
        closeModalBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let modal = this.shadowRoot.getElementById('id01');
            modal.style.display = 'none';
        })
        let modal = this.shadowRoot.getElementById('id01');
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    static setChannel(channel){
        console.log("channel", channel);
        Register.setChannel(channel);
        this.channel = channel;
    }
}
window.customElements.define('header-wc', Header);