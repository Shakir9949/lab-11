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
  
  class PerishableProduct extends Product {
    constructor(name, price, quantity, expirationDate) {
      super(name, price, quantity);
      this.expirationDate = expirationDate;
    }
  
    toString() {
      return `${super.toString()}, Expiration Date: ${this.expirationDate}`;
    }
  }
  
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
  
    displayInventory(outputElement) {
      outputElement.innerText = `Total Inventory Value: $${this.getInventoryValue().toFixed(2)}\n\n`;
      this.inventory.forEach(product => {
        outputElement.innerText += product.toString() + '\n';
      });
    }
  }
  
  const store = new Store();
  const output = document.getElementById('output');
  
  document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const expirationDate = document.getElementById('expirationDate').value;
  
    let product;
    if (expirationDate) {
      product = new PerishableProduct(name, price, quantity, expirationDate);
    } else {
      product = new Product(name, price, quantity);
    }
  
    store.addProduct(product);
    store.displayInventory(output);
  
    e.target.reset();
  });
  
  document.getElementById('applyDiscount').addEventListener('click', () => {
    Product.applyDiscount(store.inventory, 0.15);
    store.displayInventory(output);
  });  