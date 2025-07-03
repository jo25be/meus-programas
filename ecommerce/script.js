//Adicionar no carinho

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(name + " foi adicionado ao carrinho!");
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalItems;
}

window.onload = updateCartCount;



//finalizacao de compra e limpar o carrinho
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let totalElement = document.getElementById("total");
    let total = 0;

    cartItemsContainer.innerHTML = "";

    cart.forEach(item => {
        total += item.price * item.quantity;
        let div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <span>${item.name} - Kz ${item.price} x ${item.quantity}</span>
            <button onclick="removeFromCart('${item.name}')">❌</button>
        `;
        cartItemsContainer.appendChild(div);
    });

    totalElement.textContent = `Kz ${total}`;
}

function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function finalizarCompra() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let vendas = JSON.parse(localStorage.getItem("vendas")) || [];

    // Adiciona a nova venda ao histórico
    let novaVenda = {
        data: new Date().toLocaleString(),
        produtos: cart
    };

    vendas.push(novaVenda);
    localStorage.setItem("vendas", JSON.stringify(vendas));

    console.log("Venda salva:", novaVenda); // <-- Teste no Console

    alert("Compra finalizada com sucesso!");

    localStorage.removeItem("cart"); // Limpa o carrinho
    window.location.href = "produtos_vendidos.html"; // Redireciona para a página de vendas
}

window.onload = loadCart;

