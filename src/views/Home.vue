<template>
  <div class="home">
    <ul class="shop__list">
      <li class="shop__item" v-for="product in products" :key="product.id">
        <Card
          :product="product"
          @updateProduct="updateProduct"
          @addProductToCart="addProductToCart"
          @updateProductInCart="updateProductInCart"
          @removeProductFromCart="removeProductFromCart"
          @toggleFavorite="toggleFavorite"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Card from "../components/Card.vue";

export default {
  name: "Home",
  components: {
    Card,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      products: "getProductList",
    }),
  },
  methods: {
    ...mapActions([
      "updateProduct",
      "addProductToCart",
      "updateProductInCart",
      "removeProductFromCart",
      "toggleFavorite",
    ]),
  },
};
</script>

<style scoped>
.shop__list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 40px;
  margin-top: 50px;
}

.shop__item {
  display: flex;
  flex-direction: column;
}
</style>
