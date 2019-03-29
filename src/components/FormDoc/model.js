import vue from 'html-loader!./vue.html';

export default class FormDoc extends HTMLElement{

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
        let submitBtn = this.shadowRoot.querySelector('button[class=docBtn]');
        submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let nom = this.shadowRoot.querySelector('input[name=nom]');
            let description = this.shadowRoot.querySelector('textarea[name=description]');
            let auteur = this.shadowRoot.querySelector('input[name=auteur]');
            let theme = this.shadowRoot.querySelector('input[name=thematique]');
            let checkForm = true;

            if (nom.value == '') {
                let nomEmp = this.shadowRoot.getElementById("nom_empty");
                nomEmp.style.display = 'block';
                checkForm = false
            }
            if (description.value == '') {
                let descEmp = this.shadowRoot.getElementById("desc_empty");
                descEmp.style.display = 'block';
                checkForm = false
            }
            if (auteur.value == '') {
                let autEmp = this.shadowRoot.getElementById("aut_empty");
                autEmp.style.display = 'block';
                checkForm = false
            }
            if (theme.value == '') {
                let themeEmp = this.shadowRoot.getElementById("theme_empty");
                themeEmp.style.display = 'block';
                checkForm = false
            }
            if (checkForm) {
                //Change URI
                const rdf = require('rdf-ext');
                const Serializer = require('@rdfjs/serializer-jsonld');
                const serializer = new Serializer();
                let triplets = [
                    rdf.triple(rdf.literal("sujet"), rdf.namedNode("http://virtual-assembly.org/pair#"), rdf.literal(nom.value)),
                    rdf.triple(rdf.literal("sujet"), rdf.namedNode("http://virtual-assembly.org/pair#"), rdf.literal(description.value)),
                    rdf.triple(rdf.literal("sujet"), rdf.namedNode("http://virtual-assembly.org/pair#"), rdf.literal(auteur.value)),
                    rdf.triple(rdf.literal("sujet"), rdf.namedNode("http://virtual-assembly.org/pair#"), rdf.literal(theme.value))
                ];
                console.log('triplets :', triplets);

                let match = rdf.dataset(triplets);
                let output = serializer.import(match.toStream());
                console.log('output :', output);
                this.channel.publish({
                    topic:'formDoc',
                    data: {ouput}
                })
            }
        });
    }

    setChannel(channel){
        this.channel = channel;
    }
}
window.customElements.define('formdoc-wc', FormDoc);