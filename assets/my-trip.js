const attractionsRow = document.querySelector('.attractions-row');
const lodgingRow = document.querySelector('.lodging-row');
const recommendedRow = document.querySelector('.recommended-row');
const attractionsCost = document.querySelector('.attractions-cost');
const lodgingCost = document.querySelector('.lodging-cost');
const totalCost = document.querySelector('.total-cost');
const recommendedTitle = document.querySelector('.recommended-title');

const createLodging = (a) => {
  const div = document.createElement('div');
  div.classList.add('attraction');
  const title = document.createElement('h3');
  title.innerText = a.name;
  div.appendChild(title);
  const figure = document.createElement('figure');
  figure.classList.add('featured-image');
  figure.innerHTML = '<img src="../assets/images/' + a.pic + '">';
  div.appendChild(figure);
  const meta = document.createElement('div');
  meta.classList.add('meta');
  meta.dataset.id = a.id;
  const ul = document.createElement('ul');
  ul.innerHTML = '<li>Price: $' + Math.floor(a.price / 100) + '</li>'
  meta.appendChild(ul);
  const cta = document.createElement('button');
  cta.classList.add('cta');
  cta.innerText = 'Remove from Trip';
  cta.dataset.id = a.id;
  meta.appendChild(cta);
  div.appendChild(meta);
  return div;
}

const createRecommendedLodging = (a, a2) => {
  const div = document.createElement('div');
  div.classList.add('attraction');
  const title = document.createElement('h3');
  title.innerText = a.name;
  div.appendChild(title);
  const figure = document.createElement('figure');
  figure.classList.add('featured-image');
  figure.innerHTML = '<img src="../assets/images/' + a.pic + '">';
  div.appendChild(figure);
  const meta = document.createElement('div');
  meta.classList.add('meta');
  meta.dataset.id = a.id;
  const ul = document.createElement('ul');
  ul.innerHTML = '<li>Distance: ' + a.distance[a2.id - 1] + '</li><li>Price: $' + Math.floor(a.price / 100) + '</li>'
  meta.appendChild(ul);
  const cta = document.createElement('button');
  cta.classList.add('cta');
  cta.innerText = 'Add to Trip';
  cta.dataset.id = a.id;
  meta.appendChild(cta);
  div.appendChild(meta);
  return div;
}

const createAttraction = (a) => {
  const div = document.createElement('div');
  div.classList.add('attraction');
  const title = document.createElement('h3');
  const link = document.createElement('a');
  link.href = a.url;
  link.innerText = a.name;
  link.appendChild(title);
  div.appendChild(link);
  const figure = document.createElement('figure');
  figure.classList.add('featured-image');
  figure.innerHTML = '<a href="' + a.url + '"><img src="../assets/images/' + a.pic + '"></a>';
  div.appendChild(figure);
  const meta = document.createElement('div');
  meta.classList.add('meta');
  const ul = document.createElement('ul');
  ul.innerHTML = '<li>Rating: ' + a.rating + '/5</li><li>Cost: $' + Math.floor(a.cost/100) + '</li>'
  meta.appendChild(ul);
  const cta = document.createElement('button');
  cta.classList.add('cta');
  cta.innerText = 'Remove From Trip';
  cta.dataset.id = a.id;
  meta.appendChild(cta);
  div.appendChild(meta);
  return div;
}

const createRecommendedAttraction = (a) => {
  const div = document.createElement('div');
  div.classList.add('attraction');
  const title = document.createElement('h3');
  const link = document.createElement('a');
  link.href = a.url;
  link.innerText = a.name;
  link.appendChild(title);
  div.appendChild(link);
  const figure = document.createElement('figure');
  figure.classList.add('featured-image');
  figure.innerHTML = '<a href="' + a.url + '"><img src="../assets/images/' + a.pic + '"></a>';
  div.appendChild(figure);
  const meta = document.createElement('div');
  meta.classList.add('meta');
  const ul = document.createElement('ul');
  ul.innerHTML = '<li>Rating: ' + a.rating + '/5</li><li>Cost: $' + Math.floor(a.cost/100) + '</li>'
  meta.appendChild(ul);
  const cta = document.createElement('button');
  cta.classList.add('cta');
  cta.innerText = 'Add to Trip';
  cta.dataset.id = a.id;
  meta.appendChild(cta);
  div.appendChild(meta);
  return div;
}

const setAttractions = () => {
  attractionsRow.innerHTML = '';
  if (!myTrip.attractions.length) {
    attractionsRow.innerHTML = '<p>No attractions...yet! Visit the <a href="../attractions">attractions page</a>.</p>';
    calculateAttractions();
    setRecommendedRow();
    return;
  }

  const frag = document.createDocumentFragment();

  myTrip.attractions.forEach(id => {
    let a = attractions.find(el => el.id == id);
    frag.appendChild(createAttraction(a));
  });

  attractionsRow.appendChild(frag);
  calculateAttractions();
  setAttractionButtons();
  setRecommendedRow();
}

const setAttractionButtons = () => {
  document.querySelectorAll('.attractions-row .cta').forEach(el => {
    el.addEventListener('click', e => {
      const id = e.target.dataset.id;
      e.stopPropagation();
      const index = myTrip.attractions.indexOf(id);
      myTrip.attractions = myTrip.attractions.slice(0, index).concat(myTrip.attractions.slice(index + 1));
      localStorage.setItem('attractions', JSON.stringify(myTrip.attractions));
      setAttractions();
    });
  })
}

const calculateAttractions = () => {
  let total = 0;
  myTrip.attractions.forEach(id => {
    const a = attractions.find(a => a.id == id);
    total += a.cost;
  })
  attractionsCost.innerText = '$' + Math.floor(total/100);
  attractionsCost.dataset.cost = total;
  calculateTotal();
}

const setLodging = () => {
  lodgingRow.innerHTML = '';
  if (!myTrip.lodging) {
    lodgingRow.innerHTML = '<p>No lodging...yet!</p>';
    setRecommendedRow();
    calculateLodging();
    return;
  }

  const frag = document.createDocumentFragment();
  
  let l = lodging.find(lo => lo.id = myTrip.lodging);
  frag.appendChild(createLodging(l));

  lodgingRow.appendChild(frag);
  calculateLodging();
  setLodgingButton();
  setRecommendedRow();
}

const setLodgingButton = () => {
  document.querySelector('.lodging-row .cta').addEventListener('click', e => {
    e.stopPropagation();
    myTrip.lodging = null;
    localStorage.removeItem('lodging');
    setLodging();
  });
}

const calculateLodging = () => {
  let total = myTrip.lodging ? lodging.find(lo => lo.id == myTrip.lodging).price : 0;
  lodgingCost.innerText = '$' + Math.floor(total/100);
  lodgingCost.dataset.cost = total;
  calculateTotal();
}

const calculateTotal = () => {
  document.querySelector('.total-cost').innerText = '$' + Math.floor((parseInt(attractionsCost.dataset.cost) + parseInt(lodgingCost.dataset.cost)) / 100)
}

const setRecommendedRow = () => {
  recommendedRow.innerHTML = '';
  recommendedTitle.innerText = '';
  if (!myTrip.lodging && !myTrip.attractions.length) {
    return;
  }
  const frag = document.createDocumentFragment();
  if (myTrip.lodging) {
    recommendedTitle.innerText = 'Recommended Attractions';
    const theLodging = lodging.find(l => l.id == myTrip.lodging);
    const theAttractions = attractions.filter((a, index) => theLodging.distance[index] <= 3 && !myTrip.attractions.find(myA => myA == a.id));
    theAttractions.forEach(a => {
      frag.appendChild(createRecommendedAttraction(a))
    });
    
  } else {
    recommendedTitle.innerText = 'Recommended Lodging';
    const theAttraction = attractions.find(a => a.id == myTrip.attractions[0]);
    const theLodgings = lodging.filter(l => l.distance[theAttraction.id - 1] <= 3).sort((a, b) => {
      return a.distance[theAttraction.id - 1] > b.distance[theAttraction.id - 1] ? 1 : -1;
    });
    theLodgings.forEach(l => {
      frag.appendChild(createRecommendedLodging(l, theAttraction));
    })
    
  }

  recommendedRow.appendChild(frag);

  if (myTrip.lodging) {
    setRecommendedAttractionButtons();
  } else {
    setRecommendedLodgingButtons();
  }
}

const setRecommendedLodgingButtons = () => {
  
  document.querySelectorAll('.recommended-row .cta').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      myTrip.lodging = e.target.dataset.id;
      localStorage.setItem('lodging', e.target.dataset.id);
      setLodging();
    })
  });
  
}

const setRecommendedAttractionButtons = () => {
  document.querySelectorAll('.recommended-row .cta').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      myTrip.attractions.push(e.target.dataset.id);
      localStorage.setItem('attractions', JSON.stringify(myTrip.attractions));
      setAttractions();
    });
  })
}

setAttractions();
setLodging();