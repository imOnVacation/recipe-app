const apiKey = '73c936ba2f1245898d8cc4a17a7968df';

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
        this.removeAttribute('value');
      }
    });
  results.empty().append(clones);
});

function addcheck() {
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = document.getElementById('ingredients').value;
  checkbox.name = document.getElementById('ingredients').value;
  checkbox.value = document.getElementById('ingredients').value;
  checkbox.class = 'campaignCheckBox';
  checkbox.checked = true;

  var label = document.createElement('label');
  label.htmlFor = document.getElementById('ingredients').value;
  label.appendChild(
    document.createTextNode(document.getElementById('ingredients').value)
  );

  var container = document.getElementById('UserInput');
  container.appendChild(checkbox);
  container.appendChild(label);
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

function GetMeal() {
  var arr = showSelectedValues().toString().split(',');
  let unique = [...new Set(arr)];
  unique = encodeURIComponent(unique);
  let result = '';
  fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${unique}&number=30&ranking=2&ignorePantry=true&apiKey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach((p) => {
        result += `
          <div id="keyBoard" class="col-md-4 mt-2">
              <div class="card" style="width: 18rem;">
                  <img src="${p.image}" class="card-img-top img-fluid" alt="keyboard">
                  <div class="card-body">
                      <h5 class="card-title" id="itemName">${p.title}</h5>
                      <p class="card-text" id="itemDesc">${p.title}</p>
                      <p class="card-text">${p.title}</p>
                      <a href="#" class="btn btn-primary" id="redirect">Get instruction</a>
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
