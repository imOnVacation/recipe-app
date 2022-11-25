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
        this.style = 'display:none;';

      }
    });
  results.empty().append(clones);
});

function addcheck() {
  var out = '';
  var value = document.getElementById('ingredients').value;
  var check = document.getElementById(value);
  if (!value) {
    window.alert('Please enter ingredient');
  } else if (!check) {
    out += `<label id = ${value}>
            <input id=${value} name=${value} class="userIn" type='checkbox' value=${value} checked=true onclick="ShowHideUserIn(this.checked, this.value)"/>${value}
          </label>`;
    document.querySelector('#UserInput').innerHTML += out;
  } else {
    window.alert('You already have this ingredient in the box');
  }
  event.preventDefault();
}

function ShowHideUserIn(ischecked, value) {
  if (ischecked) $(`#${value}`).show();
  else {
    data = document.getElementById(value);
    data.remove();
  }
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
