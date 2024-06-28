import { menuArray } from './data.js';

const mealContainer = document.getElementById('meal-container');
const orderList = document.getElementById('order-list');
const totalElement = document.getElementById('total');
let total = 0;
const orders = {};

menuArray.forEach(meal => {
    const mealItem = document.createElement('div');
    mealItem.classList.add('meal-item');

    mealItem.innerHTML = `
        <div class="meal-content">
            <div>
                <img src="assets/${meal.name.toLowerCase()}.png" alt="${meal.name}">
            </div>
            <div>
                <h4>${meal.name}</h4>
                <p>${meal.ingredients.join(', ')}</p>
                <p>$${meal.price}</p>
            </div>
        </div>
        <div>
            <button id="${meal.id}"><img src="assets/plus.png" alt="Add ${meal.name}"></button>
        </div>
    `;

    mealContainer.appendChild(mealItem);

    document.getElementById(meal.id).addEventListener('click', () => addToOrder(meal));
});

function addToOrder(meal) {
    if (!orders[meal.id]) {
        orders[meal.id] = { ...meal, quantity: 1 };
        createOrderItem(meal);
    } else {
        orders[meal.id].quantity++;
        updateOrderItem(meal);
    }
    updateTotal(meal.price);
}

function createOrderItem(meal) {
    const orderItem = document.createElement('li');
    orderItem.id = `order-${meal.id}`;
    orderItem.innerHTML = `
        <p>${meal.name}</p>
        <p>$${meal.price} x <span class="quantity">1</span></p>
        <button class="remove" data-id="${meal.id}">remove</button>
    `;
    orderList.appendChild(orderItem);

    orderItem.querySelector('.remove').addEventListener('click', () => removeFromOrder(meal.id));
}

function updateOrderItem(meal) {
    const orderItem = document.getElementById(`order-${meal.id}`);
    orderItem.querySelector('.quantity').textContent = orders[meal.id].quantity;
}

function removeFromOrder(mealId) {
    const meal = orders[mealId];
    if (meal.quantity > 1) {
        meal.quantity--;
        updateOrderItem(meal);
    } else {
        delete orders[mealId];
        document.getElementById(`order-${mealId}`).remove();
    }
    updateTotal(-meal.price);
}

function updateTotal(amount) {
    total += amount;
    totalElement.textContent = total.toFixed(2);
}
