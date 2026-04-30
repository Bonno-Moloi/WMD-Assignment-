// BM Connect Main JavaScript

// Properties Data
const propertiesData = [
    { id: 1, name: "Sunny Campus Apartment", type: "apartment", price: 6200, furnishing: "Fully Furnished", location: "Braamfontein", img: "https://placehold.co/600x400/E8ECEF/1E4A6B?text=Modern+Apartment", desc: "2 bed, close to Wits." },
    { id: 2, name: "The Haven Bachelor Pad", type: "bachelor", price: 4300, furnishing: "Semi-furnished", location: "Auckland Park", img: "https://placehold.co/600x400/F4F2EC/1E4A6B?text=Bachelor+Studio" },
    { id: 3, name: "Student Shared House", type: "shared", price: 3600, furnishing: "Furnished", location: "Parktown", img: "https://placehold.co/600x400/D4DFE6/1E4A6B?text=Shared+Living" },
    { id: 4, name: "Lecturer's Retreat (3BR)", type: "apartment", price: 9200, furnishing: "Luxury Furnished", location: "Westcliff", img: "https://placehold.co/600x400/CFD9DE/2C3E50?text=Quiet+Retreat" },
    { id: 5, name: "City Edge Bachelor", type: "bachelor", price: 4700, furnishing: "Modern", location: "Melville", img: "https://placehold.co/600x400/F0F2F5/1E4A6B?text=City+Bachelor" },
    { id: 6, name: "Affordable Student Hub", type: "shared", price: 3200, furnishing: "Basic", location: "Doornfontein", img: "https://placehold.co/600x400/E2E6EA/1E4A6B?text=Budget+Student" }
];

// Render Properties Function
function renderProperties(filterType = "all", priceRange = "all") {
    const container = document.getElementById("propertiesContainer");
    if (!container) return;
    
    let filtered = [...propertiesData];
    if (filterType !== "all") filtered = filtered.filter(p => p.type === filterType);
    if (priceRange !== "all") {
        if (priceRange === "low") filtered = filtered.filter(p => p.price < 4500);
        else if (priceRange === "mid") filtered = filtered.filter(p => p.price >= 4500 && p.price <= 7500);
        else if (priceRange === "high") filtered = filtered.filter(p => p.price > 7500);
    }
    
    if (filtered.length === 0) { 
        container.innerHTML = `<div class="col-12 text-center py-5">No properties match filters. Try resetting.</div>`; 
        return; 
    }
    
    container.innerHTML = filtered.map(prop => `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100">
                <img src="${prop.img}" class="property-img" alt="${prop.name}">
                <div class="card-body">
                    <span class="badge badge-bm mb-2">${prop.type === 'apartment' ? 'Apartment' : (prop.type === 'bachelor' ? 'Bachelor Pad' : 'Shared Housing')}</span>
                    <h5 class="card-title">${prop.name}</h5>
                    <p class="card-text">📍 ${prop.location} | 🛋 ${prop.furnishing}</p>
                    <h5 class="text-primary">R${prop.price.toLocaleString()}<small>/month</small></h5>
                    <a href="contact.html" class="btn btn-sm btn-outline-bm mt-2">Inquire Now →</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Function
window.filterProperties = function() {
    const type = document.getElementById("propertyTypeFilter")?.value || "all";
    const price = document.getElementById("priceFilter")?.value || "all";
    renderProperties(type, price);
}

// Search Function
window.filterPropertiesSearch = function() {
    const searchTerm = document.getElementById("searchInput")?.value.toLowerCase() || "";
    let filtered = propertiesData.filter(p => p.name.toLowerCase().includes(searchTerm) || p.location.toLowerCase().includes(searchTerm));
    const container = document.getElementById("propertiesContainer");
    if(!container) return;
    if(filtered.length === 0) { container.innerHTML = `<div class="col-12 text-center py-5">No results found</div>`; return;}
    container.innerHTML = filtered.map(prop => `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100">
                <img src="${prop.img}" class="property-img">
                <div class="card-body">
                    <h5>${prop.name}</h5>
                    <p>${prop.location} | R${prop.price}</p>
                    <a href="contact.html" class="btn btn-sm btn-outline-bm">Inquire</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Review Submission
if (document.getElementById("reviewForm")) {
    document.getElementById("reviewForm").addEventListener("submit", function(e){
        e.preventDefault();
        let name = document.getElementById("reviewName")?.value;
        let role = document.getElementById("reviewRole")?.value;
        let text = document.getElementById("reviewText")?.value;
        if(!name || !text) return alert("Please fill name and comment");
        
        const reviewDiv = document.createElement("div");
        reviewDiv.className = "col-md-4";
        reviewDiv.innerHTML = `
            <div class="review-card">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                <p class="mt-2">"${text.substring(0,120)}"</p>
                <h6>— ${name} (${role})</h6>
            </div>
        `;
        document.getElementById("reviewsContainer")?.prepend(reviewDiv);
        document.getElementById("reviewForm").reset();
        alert("Thank you! Your review has been added.");
    });
}

// Contact Form Submission
if (document.getElementById("contactForm")) {
    document.getElementById("contactForm").addEventListener("submit", function(ev){
        ev.preventDefault();
        alert(`Thank you! BM Connect will reach out shortly.`);
        ev.target.reset();
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if(document.getElementById("propertiesContainer")) {
        renderProperties();
    }
    
    // Search input listener
    const searchInput = document.getElementById("searchInput");
    if(searchInput) {
        searchInput.addEventListener("input", function(e){
            if(e.target.value.trim() === "") {
                if(typeof filterProperties === 'function') filterProperties();
            } else {
                window.filterPropertiesSearch();
            }
        });
    }
});
