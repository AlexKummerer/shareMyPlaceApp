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
new LoadedPlace(coords, address);
