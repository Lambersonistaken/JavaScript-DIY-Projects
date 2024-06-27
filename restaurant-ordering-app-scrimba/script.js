import { menuArray } from './data.js';

const mealContainer = document.getElementById('meal-container');

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
            <button><img src="assets/plus.png" alt="Add ${meal.name}"></button>
        </div>
    `;

    mealContainer.appendChild(mealItem);
});
