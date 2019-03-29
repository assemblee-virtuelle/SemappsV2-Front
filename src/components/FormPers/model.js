import vue from 'html-loader!./vue.html';

export default class FormPers extends HTMLElement{

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
        let submitBtn = this.shadowRoot.querySelector('button[class=persBtn]');
        submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let nom = this.shadowRoot.querySelector('input[name=nom]');
            let prenom = this.shadowRoot.querySelector('input[name=prenom]');
            let pseudo = this.shadowRoot.querySelector('input[name=pseudo]');
            let email = this.shadowRoot.querySelector('input[name=email]');
            let adresse = this.shadowRoot.querySelector('input[name=adresse]');
            let description = this.shadowRoot.querySelector('textarea[name=description]');

            const rdf = require('rdf-ext');
            const Serializer = require('@rdfjs/serializer-jsonld');
            const serializer = new Serializer();
            let triplets = [
                rdf.triple(rdf.literal("sujet"), rdf.namedNode("http://xmlns.com/foaf/0.1/familyName"), rdf.literal(nom.value)),
                rdf.triple(rdf.literal("sujet"), rdf.namedNode("http://xmlns.com/foaf/0.1/givenName"), rdf.literal(prenom.value)),
                rdf.triple(rdf.literal("sujet"), rdf.namedNode("http://xmlns.com/foaf/0.1/nick"), rdf.literal(pseudo.value)),
                rdf.triple(rdf.literal("sujet"), rdf.namedNode("http://xmlns.com/foaf/0.1/mbox"), rdf.literal(email.value)),
                rdf.triple(rdf.literal("sujet"), rdf.namedNode("http://virtual-assembly.org/pair#"), rdf.literal(adresse.value)),//Change URI
                rdf.triple(rdf.literal("sujet"), rdf.namedNode("http://virtual-assembly.org/pair#"), rdf.literal(description.value))//Change URI
            ]
            console.log('triplets :', triplets);

            let match = rdf.dataset(triplets);
            let output = serializer.import(match.toStream());
            console.log('output :', output);
            this.channel.publish({
                topic:'formPers',
                data: ouput
            })
        });
    }

    setChannel(channel){
        this.channel = channel;
    }
}
window.customElements.define('formpers-wc', FormPers);