<template>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="photo in photos" :key="id">
        <img :src="photo.url" class="swiper-lazy" />
        <div class="swiper-lazy-preloader"></div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
export default {
  name: "PhotoSlider",
  props: {
    photos: Array,
  },
};
</script>

<style lang="scss">
.swiper {
  height: 500px;
  & img {
    height: 100%;
    max-width: 100%;
  }
  & .swiper-slide {
    display: flex;
    justify-content: center;
  }
}
</style>
