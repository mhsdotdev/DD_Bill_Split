/* ==========================
   Deli Deli Co. Dinner Bill
   ========================== */

const EXPECTED_ORDERS = {
  "Hamza": ["messiBeef", "fries", "pepsi"],
  "Taimoor": ["smokey", "fries", "water"],
  "Ali Saleem": ["messiBeef", "fries", "icedTea"],
  "Junaid Arif": ["messiChicken", "fries", "oreoShake"],
  "Abdullah": ["molten", "fries", "chocOver"],
  "Aqeel Zahid": ["swiss", "extraPatty", "fries", "zero7up"],
  "Shehryar Khan": ["swiss", "extraPatty", "fries", "chocOver"]
};

let currentUser = null;

/* ===== Element References ===== */
const landing = document.getElementById("landing");
const menuSection = document.getElementById("menuSection");
const helloText = document.getElementById("helloText");
const enterMenuBtn = document.getElementById("enterMenu");

const showBillBtn = document.getElementById("showBill");
const refreshBtn = document.getElementById("refreshMenu");
const backBtn = document.getElementById("backBtn");

const messagePopup = document.getElementById("messagePopup");
const messageBody = document.getElementById("messageBody");
const closeMessageBtn = document.getElementById("closeMessage");

const billPopup = document.getElementById("billPopup");
const selectedItemsEl = document.getElementById("selectedItems");
const subtotalEl = document.getElementById("subtotal");
const gstEl = document.getElementById("gst");
const totalEl = document.getElementById("total");
const closeBillBtn = document.getElementById("closePopup");
const abdullahWave = document.getElementById("abdullahWave");

/* ===== Initial State ===== */
window.addEventListener("DOMContentLoaded", () => {
  // Show landing on start, hide menu
  landing.classList.remove("hidden");
  menuSection.classList.add("hidden");
});

/* ===== Landing Page Logic ===== */
let selectedTile = null;
document.querySelectorAll(".name-tile").forEach(tile => {
  tile.addEventListener("click", () => {
    if (selectedTile) selectedTile.classList.remove("selected");
    selectedTile = tile;
    tile.classList.add("selected");

    currentUser = tile.dataset.person;
    enterMenuBtn.disabled = false;
  });
});

enterMenuBtn.addEventListener("click", () => {
  if (!currentUser) return;

  // Hide landing, show menu
  landing.classList.add("hidden");
  menuSection.classList.remove("hidden");

  helloText.textContent = `Hi ${currentUser}, please select what you had for dinner.`;
  resetSelections();
});

/* ===== Back Button ===== */
backBtn.addEventListener("click", () => {
  // Hide menu, show landing again
  menuSection.classList.add("hidden");
  landing.classList.remove("hidden");

  // Reset selection
  enterMenuBtn.disabled = true;
  if (selectedTile) selectedTile.classList.remove("selected");
  currentUser = null;
  resetSelections();
});

/* ===== Menu Buttons ===== */
refreshBtn.addEventListener("click", resetSelections);
function resetSelections() {
  document.querySelectorAll("#menuSection input[type='checkbox']").forEach(cb => cb.checked = false);
}

/* ===== Popup Helpers ===== */
function showMessage(text) {
  messageBody.innerHTML = text;
  messagePopup.style.display = "flex";
}
closeMessageBtn.addEventListener("click", () => {
  messagePopup.style.display = "none";
});

function showBillPopup() {
  billPopup.style.display = "flex";
}
closeBillBtn.addEventListener("click", () => {
  billPopup.style.display = "none";
});

/* ===== Validation & Bill Logic ===== */
showBillBtn.addEventListener("click", () => {
  if (!currentUser) return;

  const burgers = [...document.querySelectorAll("input[data-cat='burger']:checked")];
  const fries = [...document.querySelectorAll("input[data-cat='fries']:checked")];
  const drinks = [...document.querySelectorAll("input[data-cat='drink']:checked")];

  // Must pick one from each section
  if (burgers.length === 0 || fries.length === 0 || drinks.length === 0) {
    showMessage("Jhot mat bolo bhiya, jo khaya tha uska paisa do 😄<br><small>(Please select one from each section: Burger, Fries, Drink)</small>");
    return;
  }

  // Match expected order
  const chosen = [...document.querySelectorAll("#menuSection input[type='checkbox']:checked")].map(cb => cb.id).sort();
  const expected = (EXPECTED_ORDERS[currentUser] || []).slice().sort();
  const same = chosen.length === expected.length && chosen.every((id, i) => id === expected[i]);

  if (!same) {
    showMessage("Jhot mat bolo bhiya, jo khaya tha uska paisa do 😄<br><small>(Your selection doesn’t match your actual order)</small>");
    return;
  }

  // Calculate bill
  let subtotal = 0;
  let items = [];
  chosen.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const price = parseFloat(el.dataset.price || 0);
    subtotal += price;
    items.push(`${el.value} — Rs. ${price.toFixed(0)}`);
  });

  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  selectedItemsEl.innerHTML = `<strong>Items:</strong><br>${items.join("<br>")}`;
  subtotalEl.textContent = subtotal.toFixed(2);
  gstEl.textContent = gst.toFixed(2);
  totalEl.textContent = total.toFixed(2);

  if (currentUser === "Abdullah") {
    abdullahWave.hidden = false;
  } else {
    abdullahWave.hidden = true;
  }

  showBillPopup();
});
