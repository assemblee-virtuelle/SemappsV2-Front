import vue from 'html-loader!./vue.html';

export default class Register extends HTMLElement{

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
    }

    setListeners(){
        let submitBtn = this.shadowRoot.querySelector('button[class=registerbtn]');
        submitBtn.addEventListener("click", (e) => {
/*            let nom3 = this.shadowRoot.querySelectorAll('form > div > input');
            nom3.forEach((result) => {
                console.log("result:", result);
            })*/
            e.preventDefault();
            let nom = this.shadowRoot.querySelector('input[name=nom]');
            let prenom = this.shadowRoot.querySelector('input[name=prenom]');
            let pseudo = this.shadowRoot.querySelector('input[name=pseudo]');
            let email = this.shadowRoot.querySelector('input[name=email]');
            let pwd = this.shadowRoot.querySelector('input[name=psw]');
            let pwdRepeat = this.shadowRoot.querySelector('input[name=psw-repeat]');
            
            var pwdExpression = "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/";
		    var letters = "/^[A-Za-z]+$/";
		    var emailTest = "/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/";

            if (nom == '')
                alert('Rentrez votre nom');
            else if (!letters.test(nom))
                alert('Votre nom ne peut contenir que des lettres');

            else if (prenom == '')
                alert('Rentrez votre prénom');
            else if (!letters.test(prenom))
                alert('Votre prénom ne peut contenir que des lettres');

            else if (pseudo == '')
                alert('Rentrez votre pseudo');
            else if (!letters.test(pseudo))
                alert('Votre pseudo ne peut contenir que des lettres');

            else if (email == '')
                alert('Rentrez votre adresse mail');
            else if (!emailTest.test(email))
                alert('Adresse mail non valide');

            else if (pwd == '')
                alert('Rentrez votre mot de passe');
            else if (pwdRepeat == '')
                alert('Confirmez votre mot de passe');
            else if (!pwdExpression.test(pwd))
                alert ('Votre mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre ainsi qu\'un caratère spécial');
            else if (pwd != pwdRepeat)
                alert ('Les mots de passe ne correspondent pas');
            else if (pwd.value.length < 6)
			    alert ('Votre mot de passe doit faire au moins 7 caractères');
    		else if (pwd.value.length > 20)
    			alert ('Votre mot de passe doit faire moins 20 caractères');
	    	else
    		{				                            
                alert('Etape réussi !');
			    // Redirecting to other page or webste code. 
			    window.location = "http://127.0.0.1:8086"; 
    		}

            /*const avIssuer = new Issuer({
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
            console.log('url :', url);*/

        })};

    setChannel(channel){
        this.channel = channel;
    }
}
window.customElements.define('register-wc', Register);