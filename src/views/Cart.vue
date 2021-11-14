<template>
  <div class="cart">
    <h1 class="cart__title">
      {{ cartCount ? "Корзина" : "Корзина пуста" }}
    </h1>
    <ul v-if="cartCount" class="cart__list">
      <li class="cart__item" v-for="product in products" :key="product.id">
        <CartCard
          :product="product"
          @updateProductInCart="updateProductInCart"
          @removeProductFromCart="removeProductFromCart"
          @toggleFavorite="toggleFavorite"
        />
      </li>
    </ul>
    <p v-else>Для того, чтобы оформить заказ добавьте товары в корзину</p>
    <div v-if="cartCount" class="cart__footer">
      <p class="cart__subtitle">Общая стоимость:</p>
      <span class="cart__total">{{ cartTotal.toLocaleString() }} &#8381;</span>
      <Button class="cart__button" @click="handleConfirm">
        Оформить заказ
      </Button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CartCard from "../components/CartCard.vue";
import Button from "../components/Button.vue";

export default {
  name: "Cart",
  components: {
    CartCard,
    Button,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      products: "getCartList",
      cartCount: "getCartCount",
      cartTotal: "getCartTotal",
    }),
  },
  methods: {
    ...mapActions([
      "updateProductInCart",
      "removeProductFromCart",
      "toggleFavorite",
    ]),
    handleConfirm() {
      alert(
        this.products
          .map(
            (item) =>
              `${item.name} - ${item.amount} шт. - ${
                item.price * item.amount
              } руб.`
          )
          .join("\n")
      );
    },
  },
};
</script>

<style scoped>
.cart__title {
  margin: 20px 0;
  font-size: 24px;
}

.cart__list {
  display: flex;
  flex-direction: column;
}

.cart__item {
  display: flex;
  flex-direction: column;
}

.cart__footer {
  display: flex;
  align-items: center;
  margin-top: 30px;
  font-size: 22px;
  line-height: 30px;
}

.cart__subtitle {
  font-weight: bold;
}

.cart__total {
  margin-left: 20px;
  font-size: 20px;
  line-height: 30px;
}

.cart__button {
  margin-left: auto;
  background: #086ab6;
}

.cart__button:hover {
  opacity: 0.7;
}
</style>
