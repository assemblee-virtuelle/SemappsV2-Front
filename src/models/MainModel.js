export default class MainModel {

    constructor(mainChannel){
        this.channel = mainChannel;
    }

    getMainChannel(){
        this.channel.subscribe({
            topic: 'test',
            callback: () => {
                console.log('Test Worked');
            }
        });
    }
}