let select = document.querySelectorAll("select");
let btn = document.querySelector(".btn");
let from = document.querySelector(".from select");
let to = document.querySelector(".to select");
let exchg = document.querySelector(".exchage-rate");
for (let i = 0; i < select.length; i++) {
  for (country in country_list) {
    let selected;
    if (i === 0) {
      selected = country === "USD" ? "selected" : "";
    } else if (i === 1) {
      selected = country === "MAD" ? "selected" : "";
    }
    let opt = `<option value="${country}" ${selected}>${country}</option>`;
    select[i].insertAdjacentHTML("beforEend", opt);
  }
  select[i].addEventListener("change", (e) => {
    loadFlags(e.target);
  });
}
const swith = document.querySelector(".icon");
swith.addEventListener("click", () => {
  [from.value, to.value] = [to.value, from.value];
  loadFlags(from);
  loadFlags(to);
  getExchangeRate();
});
function loadFlags(element) {
  for (code in country_list) {
    if (code === element.value) {
      let imgTag = element.parentElement.querySelector("img");
      let curncode = country_list[code];
      imgTag.src = `https://www.countryflags.com/wp-content/uploads/${countryListAlpha[
        curncode
      ].toLowerCase()}-flag-png-large.png`;
    }
  }
}
window.addEventListener("load", (e) => {
  getExchangeRate();
});
btn.addEventListener("click", (e) => {
  e.preventDefault();
  exchg.innerText = "Get Exchange Rate...";
  getExchangeRate();
});
function getExchangeRate() {
  let amount = document.querySelector("input");
  let amountval = amount.value.replace(/\s+/g, "");
  if (amountval === "0" || amountval === "") {
    amount.value = "1";
    amountval = 1;
  }
  let Url = `https://v6.exchangerate-api.com/v6/26cd609c8ab911f0018a1f5d/latest/${from.value}`;
  fetch(Url)
    .then((result) => result.json())
    .then((result) => {
      let exchAmou = result.conversion_rates[to.value];
      let fnResult = (exchAmou * amountval).toFixed(2);
      exchg.innerText = `${amountval} ${from.value} = ${fnResult} ${to.value}`;
    });
}
