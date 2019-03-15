import vue from 'html-loader!./vue.html';

export default class Register extends HTMLElement{

    constructor(channel){
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

    eventDone() {
        let pseudo = this.shadowRoot.querySelector('input[name=pseudo]');
        let email = this.shadowRoot.querySelector('input[name=email]');
        let emailRepeat = this.shadowRoot.querySelector('input[name=email-repeat]');
        let pwd = this.shadowRoot.querySelector('input[name=psw]');
        let pwdRepeat = this.shadowRoot.querySelector('input[name=psw-repeat]');

        let errorsDiv = this.shadowRoot.querySelectorAll('div[name=form_err]');
        errorsDiv.forEach((result) => {
            result.style.display = 'none'
        })

        let pwdExpression = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
        let names = /^[A-Za-zéèêëçäàîï]+[ \-']?[A-Za-zéèêëçäàîï]*$/;
        let emailTest = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let checkForm = true;

        if (pseudo.value == '') {
            let pseudoEmp = this.shadowRoot.getElementById("pseudo_empty");
            pseudoEmp.style.display = 'block';
            checkForm = false
        }
        else if (!names.test(pseudo.value)) {
            let pseudoErr = this.shadowRoot.getElementById("pseudo_err");
            pseudoErr.style.display = 'block';
            checkForm = false
        }

        if (email.value == '') {
            let emailEmp = this.shadowRoot.getElementById("email_empty");
            emailEmp.style.display = 'block';
            checkForm = false
        }
        else if (!emailTest.test(email.value)) {
            let emailErr = this.shadowRoot.getElementById("email_err");
            emailErr.style.display = 'block';
            checkForm = false
        }
        else if (emailRepeat.value == '') {
            let emailREmp = this.shadowRoot.getElementById("email-r_empty");
            emailREmp.style.display = 'block';
            checkForm = false
        }
        else if (email.value != emailRepeat.value) {
            let emailDif = this.shadowRoot.getElementById("email_dif");
            emailDif.style.display = 'block';
            checkForm = false
        }

        if (pwd.value == '') {
            let pwdEmp = this.shadowRoot.getElementById("psw_empty");
            pwdEmp.style.display = 'block';
            checkForm = false
        }
        else if (pwdRepeat.value == '') {
            let pwdREmp = this.shadowRoot.getElementById("psw-r_empty");
            pwdREmp.style.display = 'block';
            checkForm = false
        }
        else if (!pwdExpression.test(pwd.value)) {
            let pwdErr = this.shadowRoot.getElementById("psw_err");
            pwdErr.style.display = 'block';
            checkForm = false
        }
        else if (pwd.value != pwdRepeat.value) {
            let pwdDif = this.shadowRoot.getElementById("psw_dif");
            pwdDif.style.display = 'block';
            checkForm = false
        }
        else if (pwd.value.length < 6) {
            let pwdSMin = this.shadowRoot.getElementById("psw_size_min");
            pwdSMin.style.display = 'block';
            checkForm = false
        }
        else if (pwd.value.length > 20) {
            let pwdSMax = this.shadowRoot.getElementById("psw_size_max");
            pwdSMax.style.display = 'block';
            checkForm = false
        }

        if (checkForm) {
            this.channel.publish({
                topic:'register',
                data:{
                    username: pseudo.value,
                    email: email.value,
                    password: pwd.value
                }
            })
            this.channel.subscribe({
                topic: 'regResponse',
                callback: (data) => {
                    if (data == "alreadyExist") {
                        let alExist = this.shadowRoot.getElementById("already_exist");
                        alExist.style.display = 'block';
                    }
                    else if (data == "done"){
                        window.location = "http://127.0.0.1:8086"; 
                    }
                }
            })
        }
    }

    setListeners(){
        let submitBtn = this.shadowRoot.querySelector('button[class=registerbtn]');
        submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.eventDone();
        });
        let connectBtn = this.shadowRoot.querySelector('a[class=connectBtn]');
        connectBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.channel.publish({
                topic: 'goToConnect',
                data: true
            })
        });
    }

    setChannel(channel){
        this.channel = channel;
    }
}
window.customElements.define('register-wc', Register);