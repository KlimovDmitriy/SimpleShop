<script>
import axios from "axios";
import Swiper from "swiper/bundle";
import PhotoSlider from "./components/PhotoSlider.vue";
import Products from "./components/Products.vue";
import "swiper/css/bundle";
export default {
  name: "App",
  beforeMount() {
    this.getPhotos().then(() => this.initializeSwiper());
    this.getProducts();
  },
  data() {
    return {
      photos: [],
      products: [],
    };
  },
  methods: {
    // Получаем фотографии
    async getPhotos() {
      const photoCookie = this.$cookies.get("photos");
      console.log(photoCookie);
      if (!photoCookie || photoCookie.length < 10) {
        let id = 1;
        while (this.photos.length < 10) {
          let dog = await axios.get("https://random.dog/woof.json");
          if (/\.(jpg|jpeg|png|webp|svg)$/.test(dog.data.url)) {
            this.photos.push({ url: dog.data.url, id });
          }
          id++;
        }
        this.$cookies.set("photos", JSON.stringify(this.photos), 60 * 5); // Сохраняем в куки с жизнью 5 минут (60 секунд * 5)
      } else {
        this.photos = photoCookie;
      }
    },
    // Получаем продукты
    async getProducts() {
      if (localStorage.getItem("products")) {
        this.products = JSON.parse(localStorage.getItem("products"));
      } else {
        const products = await axios.get(
          "https://dummyjson.com/products?limit=20"
        );

        this.products = products.data.products.map((product) => ({
          ...product,
          decreaseTime: Math.ceil(Math.random() * 4),
        }));
        localStorage.setItem("products", JSON.stringify(this.products));
      }
    },
    // Инициализация слайдера
    initializeSwiper() {
      new Swiper(".swiper", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        lazy: true,
        preloadImages: false,
        watchSlidesProgress: true,
        breakpoints: {
          1440: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          769: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        },
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination",
        },

        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    },
    decreaseProductStock(id) {
      let product = this.products.find((product) => product.id === id);
      product = { ...product, stock: --product.stock };
    },
  },
  components: {
    PhotoSlider,
    Products,
  },
};
</script>

<template>
  <div>
    <PhotoSlider :photos="photos" :style="{ marginBottom: '2rem' }" />
    <Products :products="products" @decrease-stock="decreaseProductStock" />
  </div>
</template>
