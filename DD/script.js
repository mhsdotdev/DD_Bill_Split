const showBillBtn = document.getElementById('showBill');
const billPopup = document.getElementById('billPopup');
const closePopupBtn = document.getElementById('closePopup');
const refreshMenuBtn = document.getElementById('refreshMenu');

showBillBtn.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('#menu input[type="checkbox"]:checked');
  let subtotal = 0;
  let itemList = [];

  checkboxes.forEach(item => {
    subtotal += parseFloat(item.value);
    itemList.push(item.parentElement.innerText);
  });

  if (subtotal === 0) {
    alert('Please select at least one item.');
    return;
  }

  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  document.getElementById('selectedItems').innerHTML =
    '<strong>Items:</strong><br>' + itemList.join('<br>');
  document.getElementById('subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('gst').textContent = gst.toFixed(2);
  document.getElementById('total').textContent = total.toFixed(2);

  billPopup.style.display = 'flex';
});

closePopupBtn.addEventListener('click', () => {
  billPopup.style.display = 'none';
});

refreshMenuBtn.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('#menu input[type="checkbox"]');
  checkboxes.forEach(cb => (cb.checked = false));
});
