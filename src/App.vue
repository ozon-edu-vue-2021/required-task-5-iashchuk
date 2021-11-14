<template>
  <div id="app" class="container">
    <Header />
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  mounted() {
    this.fetchProductListAsync();
  },
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
}

h1,
h2,
h3 {
  margin: 0;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  text-decoration: none;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
}

.wrapper {
  width: 100%;
  flex: 0 0 auto;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  padding-bottom: 150px;
}
</style>
