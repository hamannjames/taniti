const attractions = [
  {
    id: 1,
    name: "Snorkel Cove",
    url: 'snorkel-cove',
    cost: 5000,
    hours: "8AM - 6PM",
    pic: "snorkel.jpg",
    tags: "family-friendly,daytime,beach",
    rating: 4.9
  },
  {
    id: 2,
    name: "Zipline",
    url: 'zipline',
    cost: 2000,
    hours: "8AM - 6PM",
    pic: "zipline.jpg",
    tags: "family-friendly,daytime,rainforest",
    rating: 4
  },
  {
    id: 3,
    name: "Helicopter Ride",
    url: 'helicopter-ride',
    cost: 6000,
    hours: "8AM - 9PM",
    pic: "helicopter.jpg",
    tags: "city,rainforest,beach,daytime,nighttime",
    rating: 5
  },
  {
    id: 4,
    name: "Brewery Tour",
    url: 'brewery-tour',
    cost: 4000,
    hours: "4PM - 11:30PM",
    pic: "brewery.jpg",
    tags: "city,nighttime",
    rating: 3.9
  },
  {
    id: 5,
    name: "Museum",
    url: 'museum',
    cost: 4000,
    hours: "9AM-7PM",
    pic: "museum.jpg",
    tags: "city,daytime,family-friendly",
    rating: 4.2
  }
];

const lodging = [
  {
    name: "Hotel 1",
    id: 1,
    distance: [3, 4, 2, 1, 1],
    pic: "hotel1.jpg"
  },
  {
    name: "Hotel 2",
    id: 2,
    distance: [1, 2, 6, 3, 3],
    pic: "hotel2.jpg"
  },
  {
    name: "Hostel",
    id: 3,
    distance: [6, 5, 1, 3, 3],
    pic: "hostel.jpg"
  }
];

const myTrip = {};
if (localStorage.getItem('attractions')) {
  myTrip.attractions = JSON.parse(localStorage.getItem('attractions'));
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

