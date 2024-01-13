const app = Vue.createApp({
    data() {
      return {
        productos: [
          { id: 1, nombre: 'Audifonos', precio: 30000, stock: 3 },
          { id: 2, nombre: 'Mouse', precio: 20000, stock: 5 },
          { id: 3, nombre: 'Teclado', precio: 15000, stock: 10 },
          { id: 4, nombre: 'Gabinete', precio: 35000, stock: 4 },
          { id: 5, nombre: 'Pantalla', precio: 175000, stock: 3 },
          { id: 6, nombre: 'Silla', precio: 150000, stock: 2 },
        ],
        carrito: [],
        totalPagar: 0,
      };
    },
    methods: {
      agregarAlCarrito(producto) {
        if (producto.stock > 0) {
          // Agrega el producto al carrito
          this.carrito.push({ ...producto, cantidad: 1 });
          // Reduce el stock del producto
          producto.stock--;
          // Actualiza el total a pagar
          this.calcularTotalPagar();
        }
      },
      // removerDelCarrito(index) {
      //   const productoRemovido = this.carrito.splice(index, 1)[0];
      //   // Aumenta el stock del producto removido
      //   const productoOriginal = this.productos.find(p => p.id === productoRemovido.id);
      //   if (productoOriginal) {
      //     productoOriginal.stock += productoRemovido.cantidad;
      //   }
      //   // Actualiza el total a pagar
      //   this.calcularTotalPagar();
      // },
      // calcularTotalPagar() {
      //   this.totalPagar = this.carrito.reduce((total, producto) => {
      //     return total + producto.precio * producto.cantidad;
      //   }, 0);
      // },
    },
  });
  
  // Registra los componentes globalmente
  app.component('productos-disponibles', {
    props: ['productos'],
    template: `
      <div class="container">
        <h2 class="my-3">Productos disponibles</h2>
        <ul class="disponibles">
          <li v-for="(producto, index) in productos" :key="producto.id" class="py-3">
            <!-- Contenido de productos disponibles aquí -->
            <img :src="'assets/img/' + producto.nombre.toLowerCase() + '.jpg'" :alt="producto.nombre" class="product-icon" />
            <div class="cajaDetalles ">
              <div>
                {{ producto.nombre }} - <span class="product-price">\${{ producto.precio }}</span>
              </div>
              <div>Stock - <span class="product-stock">{{ producto.stock }}</span></div>
              <button v-if="producto.stock > 0" @click="agregarAlCarrito(producto)" class="btn btn-primary mx-3">
                Agregar al carrito
              </button>
              <button v-else class="btn btn-secondary mx-3" disabled>
                Sin stock
              </button>
            </div>
          </li>
        </ul>
      </div>
    `,
    // Lógica del componente
  });
  
  app.component('carrito', {
    props: ['carrito'],
    template: `
      <div>
        <h2 class="my-3">Productos en el carrito</h2>
        <ul>
          <li v-for="(producto, index) in carrito" :key="index" class="py-3">
            <!-- Contenido del carrito aquí -->
            <img :src="'assets/img/' + producto.nombre.toLowerCase() + '.jpg'" :alt="producto.nombre" class="product-icon" />
            <div class="cajaDetalles">
              <div>
                {{ producto.nombre }} - <span class="product-price">\${{ producto.precio }}</span>
              </div>
              <div>Cantidad - <span class="product-quantity">{{ producto.cantidad }}</span></div>
              <button @click="removerDelCarrito(index)" class="btn btn-danger mx-3">
                Remover del carrito
              </button>
            </div>
          </li>
        </ul>
      </div>
    `,
    // Lógica del componente
  });
  

  app.mount('#app');
  