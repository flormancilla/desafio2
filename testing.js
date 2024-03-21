const ProductManager = require("./productManager");

const producto = new ProductManager();

console.log (producto.addProduct('Remera', 'Lacoste', '128000', './images/remeras/47.png', 'AR175605', 107));
console.log (producto.addProduct('Gorra', 'Lacoste', '79000', './images/gorras/12.png', 'AR175609', 88));
console.log (producto.addProduct('Zapatillas', 'Lacoste', '240000', './images/zapatillas/23.png', 'AR175616', 26));

//console.log (producto.getProducts());
//console.log (producto.getProductsById(1));

//console.log(producto.deleteProduct(3));