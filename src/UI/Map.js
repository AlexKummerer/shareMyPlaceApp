export class Map {
  constructor(coords) {
    // this.coordinates = coords;
    this.render(coords);
  }

  async render(coordinates) {
    console.log(google);

    if (!google) {
      alert("Could not load maps library - please try again later.");
      return;
    }
    // console.log(new google.maps(document.getElementById("map")));
    const { Map } = await google.maps.importLibrary("maps");
    
    console.log(Map);
    let map = new Map(document.getElementById("map"), {
      center: coordinates,
      zoom: 16,
    });

    let marker = new google.maps.Marker({
      position: coordinates,
      map: map,
    });
  }
}
