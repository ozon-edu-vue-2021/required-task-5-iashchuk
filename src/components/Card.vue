<template>
  <div class="card">
    <div class="card__header">
      <img class="card__image" alt="Фото товара" :src="product.image" />
    </div>

    <div class="card__main">
      <div class="card__column">
        <div class="card__price">{{ product.price }} &#8381;</div>
        <FavoriteIcon
          class="card__favorite"
          :class="{
            card__favorite_is: product.isFavorite,
          }"
          @click="toggleFavorite"
        />
      </div>
      <span class="card__tag">Бестселлер</span>
      <p class="card__name">{{ product.name }}</p>
      <p class="card__description">{{ product.description }}</p>
    </div>

    <div class="card__footer">
      <Counter
        v-if="product.isAddedToCart"
        :amount="product.amount"
        @setCount="handleSetCount"
      />
      <Button v-else @click="addToCart">В корзину</Button>
      <div class="card__info">
        <b class="card__time">За час</b> курьером Zooooone Express
      </div>
    </div>
  </div>
</template>

<script>
import Counter from "./Counter.vue";
import Button from "./Button.vue";
import FavoriteIcon from "../assets/images/heart.svg";

export default {
  name: "Card",
  components: {
    Counter,
    Button,
    FavoriteIcon,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleSetCount(newValue) {
      if (newValue <= 0) {
        this.$emit("removeProductFromCart", this.product.id);
      } else {
        this.$emit("updateProductInCart", {
          ...this.product,
          amount: newValue,
        });
      }
    },
    toggleFavorite() {
      this.$emit("toggleFavorite", { id: this.product.id });
    },
    addToCart() {
      this.$emit("addProductToCart", { ...this.product, amount: 1 });
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.card__header {
  margin-bottom: 5px;
}

.card__favorite {
  flex-shrink: 0;
  cursor: pointer;
}

.card__favorite .border {
  fill: gray;
}

.card__favorite .background {
  fill: #fff;
}

.card__favorite_is .border {
  fill: #d40161;
}

.card__favorite_is .background {
  fill: #d40161;
}

.card__image {
  max-width: 100%;
  max-height: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.card__main {
  display: flex;
  flex-direction: column;
}

.card__column {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card__price {
  font-weight: bold;
  font-size: 20px;
  line-height: 32px;
}

.card__tag {
  color: orange;
}

.card__name {
  padding-right: 10px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card__description {
  display: -webkit-box;
  min-height: 42px;
  margin: 0;
  margin-bottom: 15px;
  line-height: 14px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-style: italic;
}

.card__info {
  margin-top: 10px;
  color: rgb(133, 131, 131);
}

.card__time {
  color: initial;
}

.card__footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
