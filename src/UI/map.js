export class Map {
    constructor(coords){
        this.coordinates = coords;
        this.render();
    }

    render(){
        if(!google){
            return;
        }
        const map = new google.maps.Map(document.getElementById("map"), {
            center: this.coordinates,
            zoom: 15
          });

          const marker = new google.maps.Marker({
            position: this.coordinates,
            map: map
          });
    }
}