const inputBRL = document.querySelector("#inputBRL");
const inputBTC = document.querySelector("#inputBTC");

let lastBitcoinValue = 0;

function getLastBitcoinValue() {
  fetch("https://brasilbitcoin.com.br/API/prices/BTC")
    .then((response) => response.json())
    .then((response) => {
      lastBitcoinValue = response.last;
    });
}

getLastBitcoinValue();
setInterval(() => {
  getLastBitcoinValue();
  console.log(lastBitcoinValue);
  getValue(inputBTC);
}, 10000);

function getValue(elem) {
  let cleanValue = elem.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1")
  elem.value = `BTC ${cleanValue}`;
  inputBRL.value = Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(cleanValue * lastBitcoinValue);
}
