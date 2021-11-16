<template>
  <div class="card">
    <div class="card__column">
      <img
        class="card__image"
        alt="Фото товара"
        :src="product.image"
        height="150"
      />
    </div>

    <div class="card__column">
      <p class="card__name">{{ product.name }}</p>
      <p class="card__description">{{ product.description }}</p>
      <div class="card__block">
        <p
          class="card__favorite"
          :class="{
            card__favorite_is: product.isFavorite,
          }"
          @click="toggleFavorite"
        >
          {{ product.isFavorite ? "В избранном" : "В избранное" }}
        </p>
        <p class="card__remove" @click="removeFromCart">Удалить</p>
      </div>
    </div>

    <div class="card__column">
      <div class="card__total">{{ total }} &#8381;</div>
      <div v-if="product.amount > 1" class="card__price">
        {{ product.price }} &#8381; / 1 шт.
      </div>
    </div>

    <div class="card__column card__column_counter">
      <Counter :amount="product.amount" :min="1" @setCount="handleSetCount" />
    </div>
  </div>
</template>

<script>
import Counter from "./Counter.vue";

export default {
  name: "CartCard",
  components: {
    Counter,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    total() {
      return this.product.amount * this.product.price;
    },
  },
  methods: {
    handleSetCount(amount) {
      if (amount <= 0) {
        this.$emit("removeProductFromCart", this.product.id);
      } else {
        this.$emit("updateProductInCart", { ...this.product, amount });
      }
    },
    removeFromCart() {
      this.$emit("removeProductFromCart", this.product.id);
    },
    toggleFavorite() {
      this.$emit("toggleFavorite", { id: this.product.id });
    },
  },
};
</script>

<style scoped>
.card {
  display: grid;
  width: 100%;
  grid-template-columns: 15% 1fr 10% 15%;
  grid-gap: 20px;
  margin-bottom: 30px;
  font-size: 14px;
}

.card__column {
  display: flex;
  flex-direction: column;
}

.card__column_counter {
  align-items: flex-end;
}

.card__block {
  display: flex;
}

.card__favorite {
  min-width: 100px;
  margin-right: 20px;
  color: #086ab6;
  cursor: pointer;
}

.card__favorite:hover {
  opacity: 0.7;
}

.card__favorite_is {
  color: #d40161;
}

.card__remove {
  color: #086ab6;
  cursor: pointer;
}

.card__remove:hover {
  opacity: 0.7;
}

.card__image {
  max-width: 100%;
}

.card__total {
  font-weight: bold;
  font-size: 20px;
  line-height: 32px;
}

.card__price {
  font-size: 12px;
  line-height: 18px;
}

.card__name {
  margin: 0;
  margin-bottom: 15px;
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
</style>
