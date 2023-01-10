<template>
  <div class="product_wrapper">
    <div
      class="product"
      v-for="product in products"
      :key="product.id"
      :style="{ height: `${productHeight}px` }"
    >
      <div class="img">
        <img :src="product.thumbnail" />
      </div>
      <div class="brand"><b>Brand: </b>{{ product.brand }}</div>
      <div class="category"><b>Category: </b>{{ product.category }}</div>
      <div class="desc"><b>Description: </b>{{ product.description }}</div>
      <div class="stock"><b>In stock: </b>{{ product.stock }}</div>
    </div>
  </div>
</template>

<script>
import MobileDetector from "mobile-detect";
export default {
  name: "ProductsList",
  props: {
    products: Array,
  },
  emits: ["decrease-stock"],
  data() {
    return {
      productHeight: 300,
    };
  },
  mounted() {
    this.decreaseProductsStock();
    this.setProductHeight();
  },
  methods: {
    // Проверяем устройство и устанавливаем нужную высоту для карточки продукта
    setProductHeight() {
      const md = new MobileDetector(window.navigator.userAgent);
      if (md.mobile()) {
        this.productHeight = 350;
      } else {
        this.productHeight = 300;
      }
    },
    // Метод, который эмитит в родителя уменьшение количества товара
    decreaseProductsStock() {
      this.products.forEach((product) => {
        let intervalId = setInterval(() => {
          if (product.stock === 0) {
            clearInterval(intervalId);
          } else {
            this.$emit("decrease-stock", product.id);
          }
        }, product.decreaseTime * 1000);
      });
    },
  },
};
</script>

<style lang="scss">
.product_wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  & img {
    width: 100%;
    height: 100%;
  }
  & .product {
    width: 300px;
  }
  & .img {
    height: 50%;
  }
}
</style>
