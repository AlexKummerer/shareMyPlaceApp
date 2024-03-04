import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFromAddress, getAddressFromCoords } from "./Utility/Location";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");
    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener("click", this.sharePlaceHandler);
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }

    fetch("http://localhost:3000/add-location", {
      method: "POST",
      body: JSON.stringify({
        address: address,
        lat: coordinates.lat,
        lng: coordinates.lng,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const locationId = data.locId;
        this.shareBtn.disabled = false;
        const sharedLinkInputElement = document.getElementById("share-link");
        sharedLinkInputElement.value = `${location.origin}/my-place?location=${locationId}`;
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      }, 3000);
  }

  sharePlaceHandler() {
    console.log("Sharing place...");
    const sharedLinkInputElement = document.getElementById("share-link");
    if (!navigator.clipboard) {
      sharedLinkInputElement.select();
      return;
    }
    navigator.clipboard
      .writeText(sharedLinkInputElement.value)
      .then(() => {
        alert("Copied into clipboard!");
      })
      .catch((err) => {
        console.log(err);
        sharedLinkInputElement.select();
      });
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "Location feature is not available in your browser - please use a more modern browser or manually enter the address."
      );
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait!"
    );
    modal.show();

    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        console.log(successResult);

        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        const address = await getAddressFromCoords(coordinates);
        this.selectPlace(coordinates, address);
        // const address = await PlaceFinder.getAddressFromCoords(coordinates);

        modal.hide();
        // const addressText = document.getElementById("address");
        // addressText.value = address;
      },
      (error) => {
        modal.hide();
        alert(
          "Could not locate you unfortunately. Please enter an address manually!"
        );
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    console.log(event);
    const address = event.target.querySelector("input").value;
    if (!address || address.trim().length === 0) {
      alert("Invalid address entered - please try again!");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait!"
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address);
      // const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates, address);

      this.shareBtn.disabled = false;
    } catch (err) {
      alert(err.message);
      this.shareBtn.disabled = true;
    }
    modal.hide();
  }

  static findPlace(coordinates) {
    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait!"
    );
    modal.show();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        modal.hide();
        resolve(coordinates);
      }, 2000);
    });
  }
}

const placeFinder = new PlaceFinder();
