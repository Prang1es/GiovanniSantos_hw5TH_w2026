document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('carContainer');
    const priceInput = document.getElementById('priceRange');

    // checkbox for the filters "Make" and "Color"
    const setupFilters = () => {
        const makeDiv = document.getElementById('makeList');
        const colorDiv = document.getElementById('colorList');
        const makes = [...new Set(usedCars.map(c => c.make))];
        const colors = [...new Set(usedCars.map(c => c.color))];
        makes.forEach(m => {
            makeDiv.innerHTML += `<label><input type="checkbox" class="make-check" value="${m}"> ${m}</label><br>`;
        });
        colors.forEach(c => {
            colorDiv.innerHTML += `<label><input type="checkbox" class="color-check" value="${c}"> ${c}</label><br>`;
        });
    };
    // Filter
    const applyFilters = () => {
        const minYear = parseInt(document.getElementById('minYear').value) || 0;
        const maxYear = parseInt(document.getElementById('maxYear').value) || 9999;
        const maxPrice = parseInt(priceInput.value) || Infinity;
        const maxMil = parseInt(document.getElementById('maxMileage').value) || Infinity;
        const selectedMakes = Array.from(document.querySelectorAll('.make-check:checked')).map(cb => cb.value);
        const selectedColors = Array.from(document.querySelectorAll('.color-check:checked')).map(cb => cb.value);
        const filtered = usedCars.filter(car => {
            return car.year >= minYear && 
                   car.year <= maxYear &&
                   car.price <= maxPrice && 
                   car.mileage <= maxMil &&
                   (selectedMakes.length === 0 || selectedMakes.includes(car.make)) &&
                   (selectedColors.length === 0 || selectedColors.includes(car.color));
        });
        render(filtered);
    };
    
    const render = (data) => {
        container.innerHTML = '';
        if (data.length === 0) {
            container.innerHTML = `<div class="no-results"><h3>No cars found.</h3></div>`;
            return;
        }
        data.forEach(car => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${carImg}" alt="${car.make}" style="width:100%">
                <h1>${car.year} ${car.make}</h1>
                <p class="price">$${car.price.toLocaleString()}</p>
                <p>${car.model} • ${car.mileage.toLocaleString()} miles</p>
                <p><button>Add to Cart</button></p>
            `;
            container.appendChild(card);
        });
    };
    document.addEventListener('input', applyFilters);
    document.getElementById('resetBtn').addEventListener('click', () => window.location.reload());

    setupFilters();
    render(usedCars);
});
