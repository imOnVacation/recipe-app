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
        this.removeAttribute('value');
        this.style = 'display:none;';
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

function GoResult() {
  var arr = showSelectedValues().toString().split(',');
  var unique = [...new Set(arr)];
  unique = encodeURIComponent(unique);
  localStorage['checkArr'] = unique;
  location.href = 'result.html';
  event.preventDefault();
}
