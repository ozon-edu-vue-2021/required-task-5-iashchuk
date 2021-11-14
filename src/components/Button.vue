<template>
  <button class="button" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.button {
  min-width: 150px;
  padding: 3px 12px;
  background: #d40161;
  color: white;
  line-height: 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  opacity: 0.7;
}
</style>
