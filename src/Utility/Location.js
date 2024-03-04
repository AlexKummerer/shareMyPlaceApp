const API_KEY = "";

export const getAddressFromCoords = async (coords) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${API_KEY}`;
  return await fetch(url)
    .then((response) => {
        console.log(response);
      if (response.status !== 200) {
        throw new Error("Failed to fetch address. Please try again!");
      }
      return response.json();
    })
    .then((data) => {
        console.log(data);
      if (data.error_message) {
        throw new Error(data.error_message);
      }
      const address = data.results[0].formatted_address;
      return address;
    });
};

export const getCoordsFromAddress = async (address) => {
  console.log(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${API_KEY}`;
  return await fetch(url)
    .then((response) => {
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Failed to fetch coordinates. Please try again!");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.error_message) {
        throw new Error(data.error_message);
      }
      const coordinates = data.results[0].geometry.location;
      return coordinates;
    });
};
