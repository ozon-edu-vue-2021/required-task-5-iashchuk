<template>
  <div class="card__counter">
    <button
      class="card__count card__count_minus"
      :disabled="min === amount"
      @click="decrease"
    >
      -
    </button>
    <span class="card__amount">{{ amount }} шт.</span>
    <button class="card__count card__count_plus" @click="increase">+</button>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props: {
    amount: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    decrease() {
      const newValue = this.amount - 1;
      this.$emit("setCount", newValue);
    },
    increase() {
      const newValue = this.amount + 1;
      this.$emit("setCount", newValue);
    },
  },
};
</script>

<style scoped>
.card__counter {
  display: flex;
  justify-content: space-between;
  width: 150px;
}

.card__count {
  padding: 3px 12px;
  background: #086ab6;
  border: 0;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  color: #fff;
  cursor: pointer;
}

.card__count:hover {
  opacity: 0.7;
}

.card__count:disabled {
  pointer-events: none;
  background-color: #ccc;
}

.card__count_minus {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.card__count_plus {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.card__amount {
  width: 45px;
  padding: 3px 0;
  text-align: center;
  font-size: 14px;
  line-height: 22px;
}
</style>
