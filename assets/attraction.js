const theAttraction = attractions.find(a => a.id = attractionId);
const lodgingRow = document.querySelector('.row');
const button = document.querySelector('.attraction-info .cta');

if (myTrip.attractions.includes(attractionId + '')) {
  button.innerText = 'Remove from Trip';
} else {
  button.innerText = 'Add to Trip';
}

button.addEventListener('click', e => {
  e.stopPropagation();
  
  if (myTrip.attractions.includes(attractionId)) {
    const index = myTrip.attractions.indexOf(attractionId);
    myTrip.attractions = myTrip.attractions.slice(0, index).concat(myTrip.attractions.slice(index + 1));
    localStorage.setItem('attractions', JSON.stringify(myTrip.attractions));
    button.innerText = 'Add To Trip';
  } else {
    myTrip.attractions.push(attractionId + '');
    localStorage.setItem('attractions', JSON.stringify(myTrip.attractions));
    button.innerText = 'Remove From Trip';
  }
})

const createLodging = (a) => {
  const div = document.createElement('div');
  div.classList.add('attraction');
  const title = document.createElement('h3');
  title.innerText = a.name;
  div.appendChild(title);
  const figure = document.createElement('figure');
  figure.classList.add('featured-image');
  figure.innerHTML = '<a href="' + a.url + '"><img src="../../assets/images/' + a.pic + '"></a>';
  div.appendChild(figure);
  const meta = document.createElement('div');
  meta.classList.add('meta');
  meta.dataset.id = a.id;
  const ul = document.createElement('ul');
  ul.innerHTML = '<li>Distance: ' + a.distance[attractionId - 1] + '</li>'
  meta.appendChild(ul);
  const cta = document.createElement('button');
  cta.classList.add('cta');
  cta.innerText = myTrip.lodging && myTrip.lodging == a.id ? 'Remove from Trip' : 'Add to Trip';
  cta.dataset.id = a.id;
  meta.appendChild(cta);
  div.appendChild(meta);
  return div;
}

const recommendedLodging = lodging.filter(l => l.distance[attractionId - 1] <= 3).sort((a, b) => {
  return a.distance[attractionId - 1] > b.distance[attractionId - 1] ? 1 : -1;
});

if (recommendedLodging) {
  const frag = document.createDocumentFragment();
  recommendedLodging.forEach(l => {
    frag.appendChild(createLodging(l));
  })
  lodgingRow.appendChild(frag);
}

document.querySelectorAll('.row .cta').forEach(el => {
  el.addEventListener('click', e => {
    e.stopPropagation();
    if (myTrip.lodging == e.target.dataset.id) {
      myTrip.lodging = null;
      localStorage.removeItem('lodging');
      e.target.innerText = 'Add to Trip';
    } else {
      myTrip.lodging = e.target.dataset.id;
      localStorage.setItem('lodging', e.target.dataset.id);
      e.target.innerText = 'Remove from Trip';
      document.querySelectorAll('.row .cta').forEach(el => {
        if (el.dataset.id !== e.target.dataset.id) {
          el.innerText = 'Add to Trip';
        }
      })
    }
  })
})