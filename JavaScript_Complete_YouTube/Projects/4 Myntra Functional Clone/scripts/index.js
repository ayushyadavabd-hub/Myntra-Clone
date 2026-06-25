let bagItems;
onLoad();

function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayItemsOnHomePage();
  displayBagIcon();
  setupSearchFunctionality();
}

function setupSearchFunctionality() {
  const searchInput = document.querySelector(".search_input");
  if (searchInput) {
    searchInput.addEventListener("keyup", filterItems);
  }
}

function filterItems(event) {
  const searchTerm = event.target.value.toLowerCase();
  const itemContainers = document.querySelectorAll(".item-container");

  itemContainers.forEach((container) => {
    const company =
      container.querySelector(".company-name")?.innerText.toLowerCase() || "";
    const itemName =
      container.querySelector(".item-name")?.innerText.toLowerCase() || "";

    if (company.includes(searchTerm) || itemName.includes(searchTerm)) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  });
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();

  // Visual feedback on button
  const button = event.target;
  const originalText = button.innerText;
  const originalBg = button.style.background;
  button.innerText = "✓ Added to Bag!";
  button.style.background = "linear-gradient(135deg, #03a685 0%, #028060 100%)";

  setTimeout(() => {
    button.innerText = originalText;
    button.style.background = originalBg;
  }, 1800);
}

function displayBagIcon() {
  let bagItemCountElement = document.querySelector(".bag-item-count");
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = "visible";
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = "hidden";
  }
}

function displayItemsOnHomePage() {
  let itemsContainerElement = document.querySelector(".items-container");
  if (!itemsContainerElement) {
    return;
  }
  let innerHtml = "";
  items.forEach((item) => {
    innerHtml += `
    <div class="item-container">
      <img class="item-image" src="${item.image}" alt="item image">
      <div class="rating">
          ${item.rating.stars} ⭐ | ${item.rating.count}
      </div>
      <div class="company-name">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount">(${item.discount_percentage}% OFF)</span>
      </div>
      <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
    </div>`;
  });
  itemsContainerElement.innerHTML = innerHtml;
}
