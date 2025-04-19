// Part 1: Product base class
class Product {
    constructor(name, price, quantity) {
      this.name = name;
      this.price = price;
      this.quantity = quantity;
    }
  
    getTotalValue() {
      return this.price * this.quantity;
    }
  
    toString() {
      return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}`;
    }
  
    static applyDiscount(products, discount) {
      products.forEach(product => {
        product.price -= product.price * discount;
      });
    }
  }
  
  // Part 2: PerishableProduct subclass
  class PerishableProduct extends Product {
    constructor(name, price, quantity, expirationDate) {
      super(name, price, quantity);
      this.expirationDate = expirationDate;
    }
  
    toString() {
      return `${super.toString()}, Expiration Date: ${this.expirationDate}`;
    }
  }
  
  // Part 4: Store class
  class Store {
    constructor() {
      this.inventory = [];
    }
  
    addProduct(product) {
      this.inventory.push(product);
    }
  
    getInventoryValue() {
      return this.inventory.reduce((total, product) => total + product.getTotalValue(), 0);
    }
  
    findProductByName(name) {
      return this.inventory.find(product => product.name.toLowerCase() === name.toLowerCase()) || null;
    }
  }
  
  // Part 5: Testing the System
  const output = document.getElementById('output');
  
  const store = new Store();
  
  // Create products
  const prod1 = new Product("Keyboard", 49.99, 15);
  const prod2 = new Product("Mouse", 29.99, 30);
  const prod3 = new Product("Monitor", 159.99, 10);
  const perishable1 = new PerishableProduct("Milk", 3.99, 20, "2025-05-10");
  const perishable2 = new PerishableProduct("Yogurt", 1.49, 50, "2025-04-25");
  
  // Add to store
  [prod1, prod2, prod3, perishable1, perishable2].forEach(product => store.addProduct(product));
  
  // Output before discount
  output.innerText += `Inventory Value (Before Discount): $${store.getInventoryValue().toFixed(2)}\n\n`;
  
  store.inventory.forEach(product => {
    output.innerText += product.toString() + '\n';
  });
  
  // Apply 15% discount
  Product.applyDiscount(store.inventory, 0.15);
  
  // Output after discount
  output.innerText += `\nInventory Value (After 15% Discount): $${store.getInventoryValue().toFixed(2)}\n\n`;
  
  store.inventory.forEach(product => {
    output.innerText += product.toString() + '\n';
  });
  
  // Find a specific product
  const searchName = "Milk";
  const foundProduct = store.findProductByName(searchName);
  output.innerText += `\nSearch Result for "${searchName}":\n`;
  output.innerText += foundProduct ? foundProduct.toString() : "Product not found.";  