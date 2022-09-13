const attractionsRow = document.querySelector('.row.attractions');
const filter = document.querySelector('.filter');

const setButtons = () => {
  const buttons = document.querySelectorAll('.attraction .cta');
  buttons.forEach(el => {
    el.addEventListener('click', e => {
      const id = e.target.dataset.id;
      e.stopPropagation();
  
      if (myTrip.attractions.includes(id)) {
        const index = myTrip.attractions.indexOf(id);
        myTrip.attractions = myTrip.attractions.slice(0, index).concat(myTrip.attractions.slice(index + 1));
        localStorage.setItem('attractions', JSON.stringify(myTrip.attractions));
        e.target.innerText = 'Add To Trip';
        myTripLinks.forEach(el => {
          el.classList.remove('has-item');
        });
      } else {
        myTrip.attractions.push(id);
        localStorage.setItem('attractions', JSON.stringify(myTrip.attractions));
        e.target.innerText = 'Remove From Trip';
        if (!myTrip.attractions.length && !myTrip.lodging) {
          myTripLinks.forEach(el => {
            el.classList.remove('has-item');
          });
        }
      }
      
      
    })
  })
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
  cta.innerText = myTrip.attractions.includes(a.id + '') ? 'Remove From Trip' : 'Add To Trip';
  cta.dataset.id = a.id;
  meta.appendChild(cta);
  div.appendChild(meta);
  return div;
}

const setTransactions = () => {
  attractionsRow.innerHTML = '';
  const frag = document.createDocumentFragment();
  attractions.forEach(a => {
    if (filter.value === 'all' || a.tags.split(',').includes(filter.value)) {
      frag.appendChild(createAttraction(a));
    }
  });
  attractionsRow.appendChild(frag);
  setButtons();
}

setTransactions();

filter.addEventListener('change', e => {
  console.log(filter.value);
  setTransactions();
})