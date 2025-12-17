let travelData = {};

fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log('Data loaded successfully:', data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

function searchRecommendations() {
  const search = document.getElementById('search').value.trim().toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ""; 

  if (!search) {
    resultsDiv.innerHTML = "<p>Please enter a keyword (beach, temple, or country name).</p>";
    return;
  }

  let results = [];

  if (search === "beach" || search === "beaches") {
    results = travelData.beaches;
  }

  else if (search === "temple" || search === "temples") {
    results = travelData.temples;
  }
  else {
    const country = travelData.countries.find(
      c => c.name.toLowerCase() === search
    );
    if (country) {
      results = country.cities;
    }
  }

  if (results.length === 0) {
    resultsDiv.innerHTML = `<p>No recommendations found for "${search}". Try another keyword.</p>`;
    return;
  }

  results.forEach(place => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${place.imageUrl}" alt="${place.name}">
      <h3>${place.name}</h3>
      <p>${place.description}</p>
      <button class="visit-btn">Visit</button>
    `;
    resultsDiv.appendChild(card);
  });
}

function clearResults() {
  document.getElementById('search').value = '';
  document.getElementById('results').innerHTML = '';
}

const searchButton = document.getElementById('searchBtn');

searchButton.addEventListener('click', searchRecommendations); 

const clearButton = document.getElementById('clearBtn'); 

clearButton.addEventListener('click', clearResults); 

