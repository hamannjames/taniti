const attractions = [
  {
    id: 1,
    name: "Snorkel Cove",
    cost: 5000,
    hours: "8AM - 6PM",
    pic: "snorkel.jpg",
    tags: "Family Friendly, Daytime, Water, Beach"
  },
  {
    id: 2,
    name: "Zipline",
    cost: 2000,
    hours: "8AM - 6PM",
    pic: "zipline.jpg",
    tags: "Family Friendly, Daytime, Rainforest"
  },
  {
    id: 3,
    name: "Helicopter Ride",
    cost: 6000,
    hours: "8AM - 9PM",
    pic: "helicopter.jpg",
    tags: "City, Rainforest, Beach, Daytime, Nighttime"
  },
  {
    id: 4,
    name: "Brewery Tour",
    cost: 4000,
    hours: "4PM - 11:30PM",
    pic: "brewery.jpg",
    tags: "City, Nighttime"
  },
  {
    id: 5,
    name: "Museum",
    cost: 4000,
    hours: "9AM-7PM",
    pic: "musuem.jpg",
    tags: "City, Daytime, Family Friendly"
  }
];

const lodging = [
  {
    name: "Hotel 1",
    distance: [3, 4, 2, 1, 1],
    pic: "hotel1.jpg"
  },
  {
    name: "Hotel 2",
    distance: [1, 2, 6, 3, 3],
    pic: "hotel2.jpg"
  },
  {
    name: "Hostel",
    distance: [6, 5, 1, 3, 3],
    pic: "hostel.jpg"
  }
];

const myTrip = {};
if (localStorage.getItem('attractions')) {
  myTrip.attractions = JSON.parse(localStorage.getItem(attractions));
} else {
  myTrip.attractions = [];
}
if (localStorage.getItem('lodging')) {
  myTrip.lodging = parseInt(localStorage.getItem('lodging'));
} else {
  myTrip.lodging = null;
}

const myTripLinks = document.querySelectorAll('.my-trip-links');

if (myTrip.attractions.length || myTrip.lodging) {
  myTripLinks.forEach(el => {
    el.classList.add('has-item');
  });
}

