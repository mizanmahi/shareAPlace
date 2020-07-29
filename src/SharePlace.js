import { Modal } from './UI/modal';
import { Map } from './UI/map';
import { coordsFromAddress, addressFromCoords } from './Utility/coords'
class PlaceFinder {
    constructor(){
        this.addressForm = document.querySelector('form');
        const locateBtn = document.getElementById('locate-btn');
        this.sharePlaceBtn = document.getElementById('share-btn');

        locateBtn.addEventListener('click', this.findPlaceHandler.bind(this));
        this.addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
    }

    selectPlace(coords){
        if(this.map){ 
            this.map.render()
        }
        this.map = new Map(coords);
        this.sharePlaceBtn.disabled = false;
        let address = this.addressForm.querySelector('input').value;
        if(address.trim().length === 0){
            address = addressFromCoords(coords);
        }
        const shareInput = document.getElementById('share-link');
        shareInput.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coords.lat}&lng=${coords.lng}`;
        this.sharePlaceBtn.addEventListener('click', function(){
            shareInput.select();
            navigator.clipboard.writeText(shareInput.value).then(m => alert('Link copied!'))
            .catch(err => {
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