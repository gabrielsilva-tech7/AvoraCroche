const WHATSAPP_NUMBER = "5571982771721";
const INSTAGRAM_URL = "https://instagram.com/avoracroche";

const products = [
  {
    id: 1,
    name: "Bag Ávora",
    price: 89.90,
    category: "bolsas",
    categoryLabel: "Bolsas",
    tag: "Feito à mão",
    image: "assets/bag avora.jpeg"
  },
  {
    id: 2,
    name: "Bag Butter",
    price: 89.90,
    category: "bolsas",
    categoryLabel: "Bolsas",
    tag: "Feito à mão",
    image: "assets/Bag butter.jpeg"
  },
  {
    id: 3,
    name: "Bag Criança",
    price: 69.90,
    category: "bolsas",
    categoryLabel: "Bolsas",
    tag: "Feito à mão",
    image: "assets/bag crianca.jpeg"
  },
  {
    id: 4,
    name: "Bag Criança 1",
    price: 69.90,
    category: "bolsas",
    categoryLabel: "Bolsas",
    tag: "Feito à mão",
    image: "assets/bag crianca1.jpeg"
  },
  {
    id: 5,
    name: "Bag Iva",
    price: 89.90,
    category: "bolsas",
    categoryLabel: "Bolsas",
    tag: "Feito à mão",
    image: "assets/bag iva.jpeg"
  },
  {
    id: 6,
    name: "Bag Lívia",
    price: 89.90,
    category: "bolsas",
    categoryLabel: "Bolsas",
    tag: "Feito à mão",
    image: "assets/bag livia.jpeg"
  },
  {
    id: 7,
    name: "Bag Luiza Branco",
    price: 89.90,
    category: "bolsas",
    categoryLabel: "Bolsas",
    tag: "Feito à mão",
    image: "assets/bag luiza branco.jpeg"
  },
  {
    id: 8,
    name: "Bag Luiza Preto",
    price: 89.90,
    category: "bolsas",
    categoryLabel: "Bolsas",
    tag: "Feito à mão",
    image: "assets/bag luiza preto.jpeg"
  }
];

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

let cart = JSON.parse(localStorage.getItem("avora-cart") || "[]");
let currentFilter = "todos";

const productsGrid = document.getElementById("productsGrid");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartDrawer = document.getElementById("cartDrawer");
const drawerBackdrop = document.getElementById("drawerBackdrop");
const toast = document.getElementById("toast");

function renderProducts() {
  const filtered =
    currentFilter === "todos"
      ? products
      : products.filter(product => product.category === currentFilter);

  productsGrid.innerHTML = filtered
    .map(
      product => `
        <article class="product-card">

          <div class="product-image-wrap">
            <img
              src="${product.image}"
              alt="${product.name}"
              loading="lazy"
            />

            <span class="product-tag">
              ${product.tag}
            </span>
          </div>

          <div class="product-info">

            <span class="product-category">
              ${product.categoryLabel}
            </span>

            <h3>
              ${product.name}
            </h3>

            <div class="product-bottom">

              <span class="product-price">
                ${money.format(product.price)}
              </span>

              <button
                class="add-btn"
                onclick="addToCart(${product.id})"
                aria-label="Adicionar ${product.name} ao carrinho"
              >
                +
              </button>

            </div>

          </div>

        </article>
      `
    )
    .join("");
}

function addToCart(id) {
  const item = products.find(product => product.id === id);

  if (!item) {
    return;
  }

  cart.push(item);

  saveCart();

  showToast(`${item.name} foi adicionada ao carrinho`);
}

window.addToCart = addToCart;

function saveCart() {
  localStorage.setItem("avora-cart", JSON.stringify(cart));

  renderCart();
}

function renderCart() {
  cartCount.textContent = cart.length;

  if (!cart.length) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <p>Seu carrinho está vazio.</p>
        <small>Escolha uma bolsa da coleção para começar.</small>
      </div>
    `;
  } else {
    cartItems.innerHTML = cart
      .map(
        (item, index) => `
          <div class="cart-item">

            <img
              src="${item.image}"
              alt="${item.name}"
            />

            <div>
              <h4>${item.name}</h4>
              <p>${money.format(item.price)}</p>
            </div>

            <button
              class="remove-item"
              onclick="removeFromCart(${index})"
              aria-label="Remover ${item.name}"
            >
              ×
            </button>

          </div>
        `
      )
      .join("");
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  cartTotal.textContent = money.format(total);
}

function removeFromCart(index) {
  cart.splice(index, 1);

  saveCart();
}

window.removeFromCart = removeFromCart;

function openCart() {
  cartDrawer.classList.add("open");
  drawerBackdrop.classList.add("show");
  document.body.classList.add("locked");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  drawerBackdrop.classList.remove("show");
  document.body.classList.remove("locked");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function openWhatsApp(message) {
  const url =
    `https://wa.me/${WHATSAPP_NUMBER}` +
    `?text=${encodeURIComponent(message)}`;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}

document
  .getElementById("openCart")
  .addEventListener("click", openCart);

document
  .getElementById("closeCart")
  .addEventListener("click", closeCart);

drawerBackdrop.addEventListener(
  "click",
  closeCart
);

document
  .getElementById("clearCart")
  .addEventListener("click", () => {
    cart = [];

    saveCart();

    showToast("Carrinho limpo");
  });

document
  .getElementById("checkoutButton")
  .addEventListener("click", () => {

    if (!cart.length) {
      showToast("Seu carrinho está vazio");
      return;
    }

    const lines = cart.map(
      item =>
        `• ${item.name} — ${money.format(item.price)}`
    );

    const total = cart.reduce(
      (sum, item) => sum + item.price,
      0
    );

    const message =
      `Olá! Quero fazer um pedido na Ávora:\n\n` +
      `${lines.join("\n")}\n\n` +
      `Total: ${money.format(total)}\n\n` +
      `Podemos combinar os detalhes?`;

    openWhatsApp(message);
  });

document
  .getElementById("whatsappContact")
  .addEventListener("click", () => {

    openWhatsApp(
      "Olá! Vim pelo site da Ávora e gostaria de fazer uma encomenda."
    );
  });

const instagramLink =
  document.getElementById("instagramLink");

instagramLink.href = INSTAGRAM_URL;
instagramLink.target = "_blank";
instagramLink.rel = "noopener noreferrer";

let deferredInstallPrompt = null;

const installButton =
  document.getElementById("installApp");

window.addEventListener(
  "beforeinstallprompt",
  event => {

    event.preventDefault();

    deferredInstallPrompt = event;

    if (installButton) {
      installButton.hidden = false;
    }
  }
);

if (installButton) {
  installButton.addEventListener(
    "click",
    async () => {

      if (!deferredInstallPrompt) {
        showToast(
          "No iPhone, use Compartilhar → Adicionar à Tela de Início. No Android, abra o menu do navegador → Instalar app."
        );

        return;
      }

      deferredInstallPrompt.prompt();

      await deferredInstallPrompt.userChoice;

      deferredInstallPrompt = null;

      installButton.hidden = true;
    }
  );
}

window.addEventListener(
  "appinstalled",
  () => {

    deferredInstallPrompt = null;

    if (installButton) {
      installButton.hidden = true;
    }

    showToast(
      "Ávora instalada no seu celular"
    );
  }
);

document
  .querySelectorAll(".category-card")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".category-card")
          .forEach(btn =>
            btn.classList.remove("active")
          );

        button.classList.add("active");

        currentFilter =
          button.dataset.filter;

        renderProducts();
      }
    );
  });

document.getElementById("year").textContent =
  new Date().getFullYear();

if ("serviceWorker" in navigator) {
  window.addEventListener(
    "load",
    () => {

      navigator.serviceWorker.register(
        "sw.js"
      );
    }
  );
}

renderProducts();
renderCart();