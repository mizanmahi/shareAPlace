import { Modal } from './UI/modal';
import { Map } from './UI/map';
import { coordsFromAddress } from './Utility/coords'
class PlaceFinder {
    constructor(){
        const addressForm = document.querySelector('form');
        const locateBtn = document.getElementById('locate-btn');
        this.sharePlaceBtn = document.getElementById('share-btn');

        locateBtn.addEventListener('click', this.findPlaceHandler.bind(this));
        addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
    }

    selectPlace(coords){
        if(this.map){ 
            this.map.render()
        }
        this.map = new Map(coords);
        this.sharePlaceBtn.disabled = false;
        const shareInput = document.getElementById('share-link');
        shareInput.value = `${location.origin}/my-place?lat=${coords.lat}&lng=${coords.lng}`;
        this.sharePlaceBtn.addEventListener('click', function(){
            navigator.clipboard.writeText(shareInput.value).then(m => alert('Link copied!')).catch(err => {
                console.log(err);
            })
        })              
    }

    findPlaceHandler(){
        const modal = new Modal('loading-modal-content');
        modal.show();
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(location => {
                modal.hide();
                const position = {
                    lat: location.coords.latitude ,
                    lng: location.coords.longitude
                }
                
                this.selectPlace(position)

            }, error => {
                modal.hide();
                console.log('Something went wrong! Manually enter an address')
            })
        }else{

            console.log('Your browser dont have location feautures therefore you need to switch to a more modern browser')
        }

    }

    async findAddressHandler(e){
        e.preventDefault();
        const address = e.target.querySelector('input').value;
        if(!address || address.trim().length === 0){
            alert('Enter a valid address please');
            return;
        }
        const modal = new Modal('loading-modal-content')
        modal.show();
        const coordinates = await coordsFromAddress(address);
        this.selectPlace(coordinates);
        modal.hide();
    }

}

new PlaceFinder();