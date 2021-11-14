<template>
  <div class="header">
    <h1 class="header__logo">Zooooone</h1>
    <ul class="header__nav nav">
      <li class="nav__item">
        <router-link class="nav__link" to="/">Главная</router-link>
      </li>
      <li class="nav__item">
        <router-link class="nav__link" to="/favorites">
          <span class="nav__cart">
            Избранное
            <span v-if="favoritesCount" class="nav__cart-counter">{{
              favoritesCount
            }}</span>
          </span></router-link
        >
      </li>
      <li class="nav__item nav__item_cart">
        <router-link class="nav__link nav__link_cart" to="/cart">
          <span class="nav__cart">
            Корзина
            <span v-if="cartCount" class="nav__cart-counter">{{
              cartCount
            }}</span>
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters({
      cartCount: "getCartCount",
      favoritesCount: "getFavoritesListCount",
    }),
  },
  methods: {
    ...mapActions(["fetchProductListAsync"]),
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 30px;
  background-color: #086ab6;
}

.header__logo {
  margin-right: 70px;
  color: #fff;
}

.nav {
  display: flex;
  flex-grow: 1;
}

.nav__item {
  margin-right: 30px;
  font-size: 16px;
}

.nav__item_cart {
  margin-left: auto;
}

.nav__link {
  color: #fff;
}

.nav__link.router-link-exact-active {
  color: orange;
}

.nav__link_cart {
  display: flex;
}

.nav__cart {
  position: relative;
  display: flex;
  align-items: center;
  padding-right: 45px;
}

.nav__cart-counter {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 35px;
  height: 25px;
  border-radius: 5px;
  background: #d40161;
  color: #fff;
}
</style>
