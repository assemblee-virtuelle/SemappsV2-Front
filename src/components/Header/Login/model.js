import vue from 'html-loader!./vue.html';


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



        });
    }

    setChannel(channel){
        this.channel = channel;
    }
}
window.customElements.define('login-wc', Login);