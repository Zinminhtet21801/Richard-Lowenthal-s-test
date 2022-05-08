const qty_input = document.getElementById("qty_input");
let number;
let oldNumber = 0;
const debounce = (func, delay = 500) => {
  let debounceTimer;
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function getNumber(number) {
  console.log(number, oldNumber);
  if (number > oldNumber) {
    for (let i = oldNumber; i < number; i++) {
      console.log(i);
      createCard(i + 1);
    }
  } else {
    for (let i = number; i < oldNumber; i++) {
      document
        .getElementById("card_outer_container")
        .removeChild(document.getElementById("card_outer_container").lastChild);
    }
  }
  oldNumber = number;
}

function createCard(number) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="card-body">
      <span class="rounded_number" id="number">${number}</span>
    </div>
  `;
  document.getElementById("card_outer_container").appendChild(card);
}

function inputHandle(value) {
  const input = value;
  if (isNaN(input)) {
    alert("Please enter the input as number");
    return false;
  }
  if (input.trim()) {
    fetch(`/${input}`)
      .then((res) => res.json())
      .then((data) => {
        getNumber(data);
      });
  }
}

const processChange = debounce(() => {
  const input = qty_input.value;
  inputHandle(input);
});
