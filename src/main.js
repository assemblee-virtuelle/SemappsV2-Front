//NPM Packages
import postal from 'postal';

//WebComponents
import header from 'Components/Header/model.js';
import accueil from 'Components/Accueil/model.js';
import register from 'Components/Register/model.js';
import footer from 'Components/Footer/model.js';

import Router from './control/Router.js';

//sass files 
import cssGlobal from 'Styles/colors.css';
import cssColors from 'Styles/global.css';

let loadComponent = function(comp) {
    let main = document.querySelector('#middle');
    let component = document.createElement(comp);
    let InsideStyle = document.createElement('style');
    InsideStyle.appendChild(document.createTextNode(cssGlobal.toString()));
    InsideStyle.appendChild(document.createTextNode(cssColors.toString()));
    component.appendChild(InsideStyle);
    console.log('comp :', comp);
    while (main.firstChild != null) {
        main.removeChild(main.firstChild);
    }

    main.appendChild(component);
    return component;
}

let start = async function(env) {
    let mainChannel = postal.channel('main');

    let router = new Router();
    router.setChannel(mainChannel);

    // let mainModel = new MainModel();
    // mainModel.setChannel(mainChannel);

    mainChannel.subscribe('route', route => {
        console.log('route :', route);
        let comp = route.page + '-wc';
        let component = loadComponent(comp);
        component.setChannel(mainChannel);
        mainChannel.publish('route-changed', route);
    })
};

window.addEventListener('load', () => {
    start();
});