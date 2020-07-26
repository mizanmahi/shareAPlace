import { Modal } from './UI/modal'
class PlaceFinder {
    constructor(){
        const addressForm = document.querySelector('form');
        const locateBtn = document.getElementById('locate-btn');

        locateBtn.addEventListener('click', this.findPlaceHandler);
    }

    findPlaceHandler(){
        const modal = new Modal('loading-modal-content');
        modal.show();
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(location => {
                modal.hide();
                const position = {
                    lat: location.coords.latitude + Math.random() * 50,
                    lon: location.coords.longitude + Math.random() * 50
                }
                
                console.log(position)

            }, error => {
                modal.hide();
                console.log('Something went wrong! Manually enter an address')
            })
        }else{

            console.log('Your browser dont have location feautures therefore you need to switch to a more modern browser')
        }

    }

}

new PlaceFinder();