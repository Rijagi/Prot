// Car Database (1995-2000 models)
const carDatabase = {
    BMW: {
        '3 Series': ['1995', '1996', '1997', '1998', '1999', '2000'],
        '5 Series': ['1995', '1996', '1997', '1998', '1999', '2000'],
        '7 Series': ['1995', '1996', '1997', '1998', '1999', '2000'],
        'Z3': ['1996', '1997', '1998', '1999', '2000'],
        'M3': ['1995', '1996', '1997', '1998', '1999', '2000']
    },
    'Mercedes-Benz': {
        'C-Class': ['1995', '1996', '1997', '1998', '1999', '2000'],
        'E-Class': ['1995', '1996', '1997', '1998', '1999', '2000'],
        'S-Class': ['1995', '1996', '1997', '1998', '1999', '2000'],
        'SLK': ['1996', '1997', '1998', '1999', '2000'],
        'CLK': ['1997', '1998', '1999', '2000']
    },
    'Audi': {
        'A3': ['1996', '1997', '1998', '1999', '2000'],
        'A4': ['1995', '1996', '1997', '1998', '1999', '2000'],
        'A6': ['1995', '1996', '1997', '1998', '1999', '2000'],
        'A8': ['1994', '1995', '1996', '1997', '1998', '1999', '2000'],
        'TT': ['1998', '1999', '2000']
    }
};

// Initialize the dropdown menu
function initializeMenu() {
    populateModels('BMW', 'bmw-models');
    populateModels('Mercedes-Benz', 'mercedes-models');
    populateModels('Audi', 'audi-models');
}

// Populate model lists in dropdown
function populateModels(brand, elementId) {
    const modelList = document.getElementById(elementId);
    const models = carDatabase[brand];

    for (const model in models) {
        const li = document.createElement('li');
        li.textContent = model;
        li.addEventListener('click', () => displayCarsByModel(brand, model));
        modelList.appendChild(li);
    }
}

// Display cars by brand and model
function displayCarsByModel(brand, model) {
    const years = carDatabase[brand][model];
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    years.forEach(year => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <h3>${brand}</h3>
            <p><strong>Model:</strong> ${model}</p>
            <p><strong>Body Type:</strong> ${getBodyType(model)}</p>
            <p class="year"><strong>Year:</strong> ${year}</p>
        `;
        resultsContainer.appendChild(card);
    });

    // Close dropdown after selection
    closeDropdown();
}

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
});

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!searchTerm) {
        document.getElementById('resultsContainer').innerHTML = 
            '<p class="no-results">Please enter a search term</p>';
        return;
    }

    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    let foundResults = false;

    for (const brand in carDatabase) {
        for (const model in carDatabase[brand]) {
            if (brand.toLowerCase().includes(searchTerm) || 
                model.toLowerCase().includes(searchTerm)) {
                
                foundResults = true;
                const years = carDatabase[brand][model];

                years.forEach(year => {
                    if (year.includes(searchTerm) || true) {
                        const card = document.createElement('div');
                        card.className = 'car-card';
                        card.innerHTML = `
                            <h3>${brand}</h3>
                            <p><strong>Model:</strong> ${model}</p>
                            <p><strong>Body Type:</strong> ${getBodyType(model)}</p>
                            <p class="year"><strong>Year:</strong> ${year}</p>
                        `;
                        resultsContainer.appendChild(card);
                    }
                });
            }
        }
    }

    if (!foundResults) {
        resultsContainer.innerHTML = '<p class="no-results">No cars found matching your search</p>';
    }
}

// Get body type based on model
function getBodyType(model) {
    const bodyTypes = {
        '3 Series': 'Sedan',
        '5 Series': 'Sedan',
        '7 Series': 'Sedan',
        'Z3': 'Roadster',
        'M3': 'Sedan/Coupe',
        'C-Class': 'Sedan',
        'E-Class': 'Sedan',
        'S-Class': 'Sedan',
        'SLK': 'Roadster',
        'CLK': 'Coupe',
        'A3': 'Hatchback',
        'A4': 'Sedan',
        'A6': 'Sedan',
        'A8': 'Sedan',
        'TT': 'Coupe'
    };
    return bodyTypes[model] || 'Unknown';
}

// Close dropdown function
function closeDropdown() {
    const dropdown = document.querySelector('.dropdown-content');
    dropdown.style.display = 'none';
    setTimeout(() => {
        dropdown.style.display = '';
    }, 300);
}
