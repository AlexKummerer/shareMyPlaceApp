import { Map } from "./UI/Map";

class LoadedPlace {
  constructor(coords, address) {
    new Map(coords);
    const headerTitleEl = document.querySelector("header h1");
    headerTitleEl.textContent = this.address;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coords = {
  lat: +queryParams.get("lat"),
  lng: +queryParams.get("lng"),
};
const address = queryParams.get("address");
const locId = queryParams.get("location");
fetch(process.env.API_URL + "/location/" + locId)
  .then((response) => {
    if (response.status === 404) {
      throw new Error("Could not find location!");
    }
    return response.json();
  })
  .then((data) => {
    new LoadedPlace(data.coordinates, data.address);
  })
  .catch((err) => {
    alert(err.message);
  });
