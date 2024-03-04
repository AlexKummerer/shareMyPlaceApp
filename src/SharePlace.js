import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");
    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener("click", this.sharePlaceHandler);
    addressForm.addEventListener("submit", this.findAddressHandler);
  }

  selectPlace(coordinates) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disabled = false;
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
        this.selectPlace(coordinates);
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
      const coordinates = await PlaceFinder.getCoordsFromAddress(address);
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
