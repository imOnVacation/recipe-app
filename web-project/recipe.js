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

function addcheck() {
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = document.getElementById('ingredients').value;
  checkbox.name = document.getElementById('ingredients').value;
  checkbox.value = document.getElementById('ingredients').value;
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
