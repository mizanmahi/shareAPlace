import { Map } from './UI/map';
class LoadedPlace{
    constructor(){
        const url = location.href;
        const params = new URL(url).searchParams;
        const address = params.get('address');
        const coords = {
            lat: params.get('lat'),
            lng: params.get('lng')
        }
        const header = document.querySelector('header h1');
        header.textContent = address;
        const map = new Map(coords);
        map.render();
    }


}

new LoadedPlace();