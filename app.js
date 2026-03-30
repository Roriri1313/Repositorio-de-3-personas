const STORAGE_KEY = "catalogo-productos-v1";

const form = document.getElementById("productForm");
const nameInput = document.getElementById("name");
const detailInput = document.getElementById("detail");
const valueInput = document.getElementById("value");
const grid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const productCount = document.getElementById("productCount");

const moneyFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

/** @type {{ id: string, name: string, detail: string, value: number }[]} */
let products = [];
let lastAddedId = null;

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.detail === "string" &&
        typeof item.value === "number" &&
        !Number.isNaN(item.value)
    );
  } catch {
    return [];
  }
}

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    /* espacio lleno o modo privado */
  }
}

function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function showError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const error = document.querySelector(`[data-error-for="${fieldName}"]`);
  field.classList.add("has-error");
  error.textContent = message;
}

function clearError(fieldName) {
  const field = document.getElementById(fieldName);
  const error = document.querySelector(`[data-error-for="${fieldName}"]`);
  field.classList.remove("has-error");
  error.textContent = "";
}

function validateForm() {
  let valid = true;
  const name = nameInput.value.trim();
  const detail = detailInput.value.trim();
  const value = valueInput.value.trim();

  if (!name) {
    showError("name", "Ingresa el nombre del producto.");
    valid = false;
  } else {
    clearError("name");
  }

  if (!detail) {
    showError("detail", "Ingresa una descripción.");
    valid = false;
  } else {
    clearError("detail");
  }

  if (!value) {
    showError("value", "Ingresa el valor del producto.");
    valid = false;
  } else {
    const n = Number(value);
    if (Number.isNaN(n) || n <= 0) {
      showError("value", "El valor debe ser un número mayor a cero.");
      valid = false;
    } else {
      clearError("value");
    }
  }

  return valid;
}

function updateCount() {
  const total = products.length;
  productCount.textContent = `${total} ${total === 1 ? "producto" : "productos"}`;
}

function renderProducts() {
  if (products.length === 0) {
    emptyState.hidden = false;
    grid.innerHTML = "";
    updateCount();
    return;
  }

  emptyState.hidden = true;
  grid.innerHTML = products
    .map((product) => {
      const enterClass = product.id === lastAddedId ? " product-card--enter" : "";
      return `
    <article class="product-card${enterClass}">
      <h3>${escapeHtml(product.name)}</h3>
      <p>${escapeHtml(product.detail)}</p>
      <p class="price">${moneyFormatter.format(product.value)}</p>
    </article>
  `;
    })
    .join("");

  updateCount();

  if (lastAddedId) {
    const id = lastAddedId;
    window.setTimeout(() => {
      if (lastAddedId === id) lastAddedId = null;
    }, 500);
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const newProduct = {
    id: newId(),
    name: nameInput.value.trim(),
    detail: detailInput.value.trim(),
    value: Number(valueInput.value),
  };

  lastAddedId = newProduct.id;
  products.unshift(newProduct);
  saveToStorage();
  renderProducts();
  form.reset();
  nameInput.focus();
});

products = loadFromStorage();
renderProducts();
