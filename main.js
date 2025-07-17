(function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault() // Prevent form submission
                    event.stopPropagation() // Stop event propagation
                }
                form.classList.add('was-validated') // Add Bootstrap validation class
            }, false)
        })
})();

// Counter & Price Quantity

// Initialize quantity and price variables
let quantity = 0;
const pricePerDozen = 192; // Set your price per dozen here
const totalElement = document.getElementById('total');
const countElement = document.getElementById('count');

// Function to update the total price
function updateTotal() {
    const total = quantity * pricePerDozen;
    totalElement.textContent = total; // Update the total price displayed
}

// Function to increment the quantity
function increment() {
    quantity += 1; // Increase quantity by 1
    countElement.textContent = quantity; // Update the displayed quantity
    updateTotal(); // Update the total price
}

// Function to decrement the quantity
function decrement() {
    if (quantity > 0) {
        quantity -= 1; // Decrease quantity by 1
        countElement.textContent = quantity; // Update the displayed quantity
        updateTotal(); // Update the total price
    }
}

// Attach event listeners to the buttons
document.querySelector('#counter a:nth-child(1)').onclick = decrement; // Minus button
document.querySelector('#counter a:nth-child(3)').onclick = increment; // Plus button

// Email JS


// Initialize EmailJS with your user ID
(function () {
    emailjs.init("EPDTXIjARr9r3nqkD");
})();


// Handle form submission
document.getElementById('submitBtn').addEventListener('click', function () {
    const form = document.querySelector('.needs-validation');

    if (form.checkValidity()) {
        // Show loading modal
        const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
        loadingModal.show();

        // Send to customer
        emailjs.send("service_8gb0fbf", "template_q03f6zd", {
                name: document.getElementById('full_name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('telephone_num').value,
                address: (document.getElementById('address_one').value || '') + ' ' + (document.getElementById('address_two').value || ''),
                city: document.getElementById('city').value,
                country: document.getElementById('country').value,
                quantity: document.getElementById('count').textContent,
                total: document.getElementById('total').textContent + ' USD'
            })
            .then(function () {
                // Send to yourself
                return emailjs.send("service_8gb0fbf", "template_68cefvi", {
                    name: document.getElementById('full_name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('telephone_num').value,
                    address: (document.getElementById('address_one').value || '') + ' ' + (document.getElementById('address_two').value || ''),
                    city: document.getElementById('city').value,
                    country: document.getElementById('country').value,
                    quantity: document.getElementById('count').textContent,
                    total: document.getElementById('total').textContent + ' USD'
                });
            })
            .then(function () {
                // Hide loading modal and show confirmation modal
                loadingModal.hide();
                const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
                confirmationModal.show();
            }, function (error) {
                // Hide loading modal and show error alert
                loadingModal.hide();
                alert('Failed to send order: ' + JSON.stringify(error));
            });
    } else {
        form.classList.add('was-validated');
    }
});
