<template>
  <div class="home">
    <h1 class="favorites__title">Избранное</h1>
    <ul v-if="products.length" class="favorites__list">
      <li class="favorites__item" v-for="product in products" :key="product.id">
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
    <p v-else>
      В избранном ничего нет. Тут вы можете хранить свои любимые товары.
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Card from "../components/Card.vue";

export default {
  name: "Favorites",
  components: {
    Card,
  },
  beforeDestroy() {
    this.actualizeFavorites();
  },
  computed: {
    ...mapGetters({
      products: "getFavoritesList",
    }),
  },
  methods: {
    ...mapActions([
      "updateProduct",
      "addProductToCart",
      "updateProductInCart",
      "removeProductFromCart",
      "toggleFavorite",
      "actualizeFavorites",
    ]),
  },
};
</script>

<style scoped>
.favorites__title {
  margin: 20px 0;
  font-size: 24px;
}

.favorites__list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 40px;
}

.favorites__item {
  display: flex;
  flex-direction: column;
}
</style>
