const clickButtonHandler = (evt) => {
  const result = document.getElementById("receiptSearch").value;
  if (result) {
    document.getElementById("receiptSearch").value += `, ${evt.value}`;
  } else document.getElementById("receiptSearch").value += evt.value;
};

var results = $("#myDiv"),
  checks = $("#Food input[type=checkbox]");

checks.on("change", function () {
  var clones = checks
    .filter(":checked")
    .next()
    .addBack()
    .clone()
    .each(function () {
      if (this.id && this.type && this.type === "checkbox") {
        this.removeAttribute("id");
      }
    });
  results.empty().append(clones);
});
