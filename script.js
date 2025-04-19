// Product base class
class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  // Calculates the total value of the product in stock
  getTotalValue() {
    return this.price * this.quantity;
  }

  // Returns a formatted string describing the product
  toString() {
    return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}`;
  }

  // Static method to apply a discount to an array of products
  static applyDiscount(products, discount) {
    products.forEach(product => {
      product.price -= product.price * discount;
    });
  }
}

// PerishableProduct subclass extending Product
class PerishableProduct extends Product {
  constructor(name, price, quantity, expirationDate) {
    super(name, price, quantity);
    this.expirationDate = expirationDate;
  }

  // Override toString to include expiration date
  toString() {
    return `${super.toString()}, Expiration Date: ${this.expirationDate}`;
  }
}

// Store class to manage inventory
class Store {
  constructor() {
    this.inventory = []; // Array to hold Product and PerishableProduct objects
  }

  // Adds a product to the inventory
  addProduct(product) {
    this.inventory.push(product);
  }

  // Calculates the total value of all products in the inventory
  getInventoryValue() {
    return this.inventory.reduce((total, product) => total + product.getTotalValue(), 0);
  }

  // Finds a product by name (case-insensitive)
  findProductByName(name) {
    return this.inventory.find(product => product.name.toLowerCase() === name.toLowerCase()) || null;
  }

  // Outputs the full inventory to the DOM
  displayInventory(outputElement) {
    outputElement.innerText = `Total Inventory Value: $${this.getInventoryValue().toFixed(2)}\n\n`;
    this.inventory.forEach(product => {
      outputElement.innerText += product.toString() + '\n';
    });
  }
}

// Initialize a new store and grab the output area
const store = new Store();
const output = document.getElementById('output');

// Handle form submission to create a new product
document.getElementById('productForm').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload

  // Get values from form fields
  const name = document.getElementById('name').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const quantity = parseInt(document.getElementById('quantity').value);
  const expirationDate = document.getElementById('expirationDate').value;

  // Determine if the product is perishable
  let product;
  if (expirationDate) {
    product = new PerishableProduct(name, price, quantity, expirationDate);
  } else {
    product = new Product(name, price, quantity);
  }

  // Add product to store and update output
  store.addProduct(product);
  store.displayInventory(output);

  // Reset the form fields
  e.target.reset();
});

// Handle discount application
document.getElementById('applyDiscount').addEventListener('click', () => {
  Product.applyDiscount(store.inventory, 0.15); // Apply 15% discount
  store.displayInventory(output); // Refresh inventory view
});