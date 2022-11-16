const clickButtonHandler = (evt) => {
  const result = document.getElementById("receiptSearch").value;
  if (result) {
    document.getElementById("receiptSearch").value += `, ${evt.value}`;
  } else document.getElementById("receiptSearch").value += evt.value;
};

function hamburgerMenu() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
