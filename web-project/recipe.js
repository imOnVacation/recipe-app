// const apiKey = '73c936ba2f1245898d8cc4a17a7968df';

const clickButtonHandler = (evt) => {
  const result = document.getElementById('receiptSearch').value;
  if (result) {
    document.getElementById('receiptSearch').value += `, ${evt.value}`;
  } else document.getElementById('receiptSearch').value += evt.value;
};

var results = $('#myDiv'),
  checks = $('#Food input[type=checkbox]');

checks.on('change', function () {
  var clones = checks
    .filter(':checked')
    .next()
    .addBack()
    .clone()
    .each(function () {
      if (this.id && this.type && this.type === 'checkbox') {
        this.removeAttribute('id');
      }
    });
  results.empty().append(clones);
});

// $(function () {
//   $(':checkbox').change(function () {
//     var arr = $(':checkbox:checked')
//       .map(function () {
//         return $(this).next().html();
//       })
//       .get();
//     $('#myDiv').html(arr.join(', '));
//   });
// });

// function addcheck() {
//   var checkbox = document.createElement('input');
//   checkbox.type = 'checkbox';
//   checkbox.id = document.getElementById('ingredients').value;
//   checkbox.name = document.getElementById('ingredients').value;
//   checkbox.value = document.getElementById('ingredients').value;
//   checkbox.class = 'campaignCheckBox';
//   checkbox.checked = true;

//   var label = document.createElement('label');
//   label.htmlFor = document.getElementById('ingredients').value;
//   label.appendChild(
//     document.createTextNode(document.getElementById('ingredients').value)
//   );

//   var container = document.getElementById('UserInput');
//   container.appendChild(checkbox);
//   container.appendChild(label);
//   event.preventDefault();
// }

function addcheck() {
  var out = '';
  var value = document.getElementById('ingredients').value;
  var check = document.getElementById(value);
  if (!value) {
    window.alert('Please enter ingredient');
  } else if (!check) {
    out += `<label>
            <input id=${value} name=${value}  type='checkbox' value=${value} checked=true />
            <for>${value}</for>
          </label>`;
    document.querySelector('#UserInput').innerHTML += out;
  } else {
    window.alert('You already have this ingredient in the box');
  }
  event.preventDefault();
}

function reset() {
  history.go(0);
}

function showSelectedValues() {
  return $('input[type=checkbox]:checked')
    .map(function () {
      return this.value;
    })
    .get()
    .join(',');
}

function GoResult() {
  var arr = showSelectedValues().toString().split(',');
  var unique = [...new Set(arr)];
  unique = encodeURIComponent(unique);
  localStorage['checkArr'] = unique;
  if (unique.length === 0) {
    window.alert("You didn't select anything");
  } else {
    location.href = 'result.html';
  }
  event.preventDefault();
}

// function GetRecipe() {
//   var arr = showSelectedValues().toString().split(',');
//   var unique = [...new Set(arr)];
//   unique = encodeURIComponent(unique);
//   var result = '';
//   fetch(
//     `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${unique}&number=30&ranking=2&ignorePantry=true&apiKey=${apiKey}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       data.forEach((p) => {
//         var missed = '';
//         var i = 1;
//         p.missedIngredients.forEach((miss) => {
//           missed += `${i}. ${miss.name} <br>`;
//           ++i;
//         });
//         result += `
//           <div id="keyBoard" class="col-md-3 mt-2" style="display: inline-block">
//               <div class="card" style="width: 18rem;">
//                   <img src="${p.image}" class="card-img-top img-fluid" alt="keyboard">
//                   <div class="card-body">
//                       <h5 class="card-title" id="itemName">${p.title}</h5>
//                       <p class="card-text" id="itemDesc">Missed Ingredients Count: ${p.missedIngredientCount}</p>
//                       <p class="card-text""><h6>Missed Ingredients:</h6> ${missed}</p>
//                       <p class="card-text">Used ingredients Count: ${p.usedIngredientCount}</p>
//                       <a href="#" class="btn btn-primary" id="redirect" onClick = "GetURL(${p.id})">Get instruction</a>
//                   </div>
//               </div>
//           </div>`;
//       });
//       document.querySelector('#Out').innerHTML = result;
//     })
//     .catch(() => {
//       console.log('error');
//     });
//   event.preventDefault();
// }

// function GetURL(id) {
//   fetch(
//     `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       location.href = `${data.spoonacularSourceUrl}`;
//     })
//     .catch(() => {
//       console.log('error');
//     });
//   event.preventDefault();
// }
