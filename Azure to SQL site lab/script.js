const STORAGE_KEY = "localStorageDemo";

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    loadData();
});

// Save data
document.getElementById("dataForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const input = document.getElementById("dataInput");
    const value = input.value.trim();
    
    if (value) {
        const newItem = {
            id: Date.now(),
            content: value
        };
        
        const savedItems = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        savedItems.push(newItem);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems));
        
        loadData();
        input.value = "";
    }
});

// Clear all
document.getElementById("clearAll").addEventListener("click", () => {
    if (confirm("Clear all stored data?")) {
        localStorage.removeItem(STORAGE_KEY);
        loadData();
    }
});

// Load data
function loadData() {
    const savedItems = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const tableBody = document.querySelector("#dataTable tbody");
    
    tableBody.innerHTML = savedItems.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.content}</td>
            <td><button class="delete-btn" data-id="${item.id}">Delete</button></td>
        </tr>
    `).join("");
    
    // Add delete handlers
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            deleteItem(btn.getAttribute("data-id"));
        });
    });
}

// Delete item
function deleteItem(id) {
    const savedItems = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const updatedItems = savedItems.filter(item => item.id != id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    loadData();
}