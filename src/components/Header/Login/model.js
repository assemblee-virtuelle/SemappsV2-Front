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
        let submitBtn = this.shadowRoot.querySelector('button[class=loginBtn]');
        submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let pseudo = this.shadowRoot.querySelector('input[name=username]');
            let pwd = this.shadowRoot.querySelector('input[name=pwd]');
            let checkForm = true;

            let errorsDiv = this.shadowRoot.querySelectorAll('div[name=form_er]');
            errorsDiv.forEach((result) => {
                result.style.display = 'none'
            })

            if (pseudo.value == '')
            {
                let pseudoEmp = this.shadowRoot.getElementById("pseudo_emp");
                pseudoEmp.style.display = 'block';
                checkForm = false
            }
            if (pwd.value == '')
            {
                let pwdEmp = this.shadowRoot.getElementById("psw_emp");
                pwdEmp.style.display = 'block';
                checkForm = false
            }

            if (checkForm)
            {
                console.log('Log in !');
                console.log('email :', pseudo.value);
                console.log('pwd :', pwd.value);
                this.channel.publish({
                    topic:'login',
                    data:{
                        email: pseudo.value,
                        password: pwd.value
                    }
                })
                this.channel.subscribe({
                    topic: 'logResponse',
                    callback: (data) => {
                        if (data == "noExist") {
                            let noExist = this.shadowRoot.getElementById("no_exist");
                            noExist.style.display = 'block';
                        }
                        else if (data == "done"){
                            window.location = "http://127.0.0.1:8086"; 
                        }
                    }
                })
            }
        });
    }

    setChannel(channel){
        this.channel = channel;
    }
}
window.customElements.define('login-wc', Login);