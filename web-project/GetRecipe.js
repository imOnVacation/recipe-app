const apiKey = 'aab52f4293104832b35749936dab6c40';
// var LikeMap = new Map();

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
                  <a href="" class="favorite-btn">
                        <i class="material-icons" class = "fa-favorite" onclick ="Like(${p.id})">favorite_border</i>
                  </a>
                  <img src="${p.image}" >
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
      console.log('error when getting recipe');
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

function Like(id) {
  fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      var ingredients = '';
      data.extendedIngredients.forEach((ingre) => {
        ingredients += `${ingre.original} <br>`;
      });
      if (!localStorage['like']) localStorage['like'] = '';
      localStorage['like'] += `
          <div id=${data.title} class="col-md-3 mt-2" style="display: inline-block; padding:0.5rem;">
              <div class="card" style="width: auto;" bg-success>
                  <img src="${data.image}" >
                  <div class="card-body" >
                      <h5 class="card-title" id="itemName">${data.title}</h5>
                      <p class="card-text"> Ingredients: ${ingredients}
                      <p class="card-text"> Instruction: ${data.instructions}
                  </div>
              </div>
          </div>`;
      // LikeMap.set(
      //   id,
      //   `
      //     <div id=${data.title} class="col-md-3 mt-2" style="display: inline-block; padding:0.5rem;">
      //         <div class="card" style="width: auto;" bg-success>
      //             <img src="${data.image}" >
      //             <div class="card-body" >
      //                 <h5 class="card-title" id="itemName">${data.title}</h5>
      //                 <p class="card-text"> Ingredients: ${ingredients}
      //                 <p class="card-text"> Instruction: ${data.instructions}
      //             </div>
      //         </div>
      //     </div>`
      // );
      // localStorage.myMap = JSON.stringify(Array.from(LikeMap.entries()));
    })
    .catch(() => {
      console.log('error when like');
    });
  event.preventDefault();
}

function getLike() {
  if (localStorage['like'])
    document.querySelector('#LikeOut').innerHTML = localStorage['like'];
  else {
    document.querySelector('#LikeError').innerHTML = `
        <div  >
            <h3 > Looks like you hadn't liked any recipe yet, try to like some! </h3>
        </div>`;
  }
  // var result = '';
  // console.log(LikeMap);
  // LikeMap = new Map(JSON.parse(localStorage.myMap));
  // LikeMap.forEach((value, keys) => {
  //   result += keys;
  // });
  // document.querySelector('#LikeOut').innerHTML = result;
}

function remoceAllLike() {
  localStorage.clear();
  history.go(0);
}
