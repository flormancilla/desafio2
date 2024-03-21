const { isUtf8 } = require('buffer');
const fs = require('fs')

class ProductManager {
  products;
  path;
  static idProducto = 0;
  constructor() {
    this.path = './data/productos.json';
    this.products = this.leerProductosInFile();
  }

  asignarIdProducto() {
    let id = 1;
    if (this.products.length !== 0)
      id = this.products[this.products.length - 1].id + 1;
    return id;
  }
  

  leerProductosInFile() {
    try {
      if (fs.existsSync(this.path))
        return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
      return [];
    }
    catch (error) {
      console.log(`Se produjo un error al leer el archivo de productos, ${error}`);
    }
  }

  guardarArchivo() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products))
    } catch (error) {
      console.log('Ocurrio un error al momento de guardar.')
    }

  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock)
      return `Todos los campos son requeridos (title, description, price, thumbnail, code, stock)`;
    const codigoRepetido = this.products.some(p => p.code == code);
    if (codigoRepetido)
      return `El ${code} ya se encuentra registardo en otro producto`;

    ProductManager.idProducto = ProductManager.idProducto + 1;

    const id = this.asignarIdProducto();

    const nuevoProducto = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(nuevoProducto);
    this.guardarArchivo();
    return `Producto agregado exitosamente.`
  }

  getProducts() {
    return this.products;
  }

  getProductsById(id) {
    const producto = this.products.find(p => p.id == id);
    if (producto)
      return producto;
    else
      return `No se encuentra el producto ${id}`;

  }

  updateProduct(id, objetUpdate) {
    let msg = `El producto con id ${id} no existe`;
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      const {id, ...rest} = objetUpdate;
      this.products[index] = {...this.products[index], ...rest};
      this.guardarArchivo();
      
      return msg=`Producto actualizado.`
    }
    return msg;
  }
  deleteProduct(id) {
    let msg = 'El producto seleccionado no existe'
    const index = this.products.findIndex(p => p.id === id);
    if (index !== - 1) {
      this.products = this.products.filter(p => p.id !== id);
      this.guardarArchivo();
      msg = 'Producto eliminado.'
    }
    return msg;
  }
}



module.exports = ProductManager;