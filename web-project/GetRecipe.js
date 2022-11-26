const apiKey = '73c936ba2f1245898d8cc4a17a7968df';

function GetRecipe() {
  //get local storeage created from GoResult() function
  var Arr = localStorage['checkArr'];
  var result = ''; // reuslt html
  var resultCount = 0; // incase no recipe from this food
  //fetch data from API
  fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${Arr}&number=30&ranking=2&ignorePantry=true&apiKey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach((p) => {
        var missed = '';
        var i = 1;
        //generate missing ingredients list
        p.missedIngredients.forEach((miss) => {
          missed += `${i}. ${miss.name} <br>`;
          ++i;
        });
        resultCount++;
        //create a Bootstrap card element with each recipe data
        result += `
          <div id="keyBoard" class="col-md-3 mt-2" style="display: inline-block; padding:0.5rem;">
              <div class="card" style="width: auto; bg-success">
                  <img src="${p.image}" >
                     <a href="" class="favorite-btn" onlick = >
                        <i class="material-icons" class = "fa-favorite">favorite_border</i>
                    </a>
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
      if (resultCount === 0) {
        //in the case of no recipe getting generate
        result += `
        <div style="text-align:center float-flex;">
            <h3 > Oops, looks like we don't have any recipe for these ingredients </h3>
        </div>
        `;
      }
      //put result into element as cards
      document.querySelector('#Out').innerHTML = result;
    })
    .catch(() => {
      console.log('error');
    });
  event.preventDefault();
}

//Get instruction function
function GetURL(id) {
  fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      //relocate page to instruction page once user click 'get instruction'
      location.href = `${data.spoonacularSourceUrl}`;
    })
    .catch(() => {
      console.log('error');
    });
  event.preventDefault();
}
