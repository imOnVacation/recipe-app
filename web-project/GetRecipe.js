const apiKey = 'aab52f4293104832b35749936dab6c40';

function GetRecipe() {
  var Arr = localStorage['checkArr'];
  var result = '';
  fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${Arr}&number=30&ranking=2&ignorePantry=true&apiKey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach((p) => {
        var missed = '';
        var i = 1;
        p.missedIngredients.forEach((miss) => {
          missed += `${i}. ${miss.name} <br>`;
          ++i;
        });
        result += `
          <div id="keyBoard" class="col-md-3 mt-2" style="display: inline-block; padding:0.5rem;">
              <div class="card" style="width: auto;">
                  <img src="${p.image}" class="card-img-top img-fluid" alt="keyboard">
                  <div class="card-body" >
                      <h5 class="card-title" id="itemName">${p.title}</h5>
                      <p class="card-text" id="itemDesc" style="color: crimson;"> 
                          Missed Ingredients Count: ${p.missedIngredientCount}</p>
                      <p class="card-text""><h6>Missed Ingredients:</h6> ${missed}</p>
                      <p class="card-text">Used ingredients Count: ${p.usedIngredientCount}</p>
                      <a href="#" class="btn btn-primary" id="redirect" onClick = "GetURL(${p.id})">Get instruction</a>
                  </div>
              </div>
          </div>`;
      });
      document.querySelector('#Out').innerHTML = result;
    })
    .catch(() => {
      console.log('error');
    });
  event.preventDefault();
}

function GetURL(id) {
  fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      location.href = `${data.spoonacularSourceUrl}`;
    })
    .catch(() => {
      console.log('error');
    });
  event.preventDefault();
}
