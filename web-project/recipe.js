const clickButtonHandler = (evt) => {
  const result = document.getElementById("receiptSearch").value;
  if (result) {
    document.getElementById("receiptSearch").value += `, ${evt.value}`;
  } else document.getElementById("receiptSearch").value += evt.value;
};
