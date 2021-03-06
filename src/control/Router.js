import Navigo from 'navigo';

export default class Router {
  constructor() {

    this.subscriptions = [];

    var root = null;
    var useHash = true; // Defaults to: false
    var hash = '#'; // Defaults to: '#'
    this.router = new Navigo(root, useHash, hash);

    this.router.on((params, query) => {
      this.router.navigate('/accueil');
    }).resolve();

    this.router.on('/:page', (params, query) => {
      console.log('route', params, query);
      this.publish('route',params);
    }).resolve();

    this.router.on('/:page/:id', (params, query) => {
      // console.log('route', params, query);
      this.publish('route',params);
    }).resolve();

    this.router.on('/resource/:type/:id', (params, query) => {
      console.log('route', params, query);
      this.publish('route',params);
    }).resolve();
  }

  setChannel(chan) {
    this.channel = chan;
    this.channel.subscribe('navigate', (route) => {
      this.router.navigate('route');
    })
  }

  publish(message,data){
    let count = 0;
    let checkExist = setInterval(() => {
      if (this.channel != undefined) {
        //console.log('CRUD message',message);
        clearInterval(checkExist);
        this.channel.publish(message,data)
      } else {
        count++;
        if (count > 100) {
          clearInterval(checkExist);
          console.warn(`http channel doesn't exist after 10s`);
        }
      }
    }, 100); // check every 100ms
  }

}