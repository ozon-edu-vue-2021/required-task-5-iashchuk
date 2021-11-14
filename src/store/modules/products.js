import api from "../../api";

const FILL_PRODUCT_LIST = "FILL_PRODUCTS";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const UPDATE_PRODUCT_IN_CART = "UPDATE_PRODUCT_IN_CART";
const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
const ACTUALIZE_FAVORITES = "ACTUALIZE_FAVORITES";

export default {
  state: {
    list: [],
    cart: [],
    favorites: [],
  },
  actions: {
    async fetchProductListAsync({ dispatch }) {
      dispatch("fillProductList", await api.products());
    },
    fillProductList({ commit }, payload) {
      commit(FILL_PRODUCT_LIST, payload);
    },
    updateProduct({ commit }, payload) {
      commit(UPDATE_PRODUCT, payload);
    },
    addProductToCart({ commit }, payload) {
      commit(ADD_PRODUCT_TO_CART, payload);
    },
    updateProductInCart({ commit }, payload) {
      commit(UPDATE_PRODUCT_IN_CART, payload);
    },
    removeProductFromCart({ commit }, payload) {
      commit(REMOVE_PRODUCT_FROM_CART, payload);
    },
    toggleFavorite({ commit }, payload) {
      commit(TOGGLE_FAVORITE, payload);
    },
    actualizeFavorites({ commit }, payload) {
      commit(ACTUALIZE_FAVORITES, payload);
    },
  },
  mutations: {
    [FILL_PRODUCT_LIST](state, payload) {
      state.list = payload;
    },
    [UPDATE_PRODUCT](state, payload) {
      state.list = state.list.map((item) =>
        item.id === payload.id ? payload : item
      );
    },
    [ADD_PRODUCT_TO_CART](state, payload) {
      state.cart = [...state.cart, payload];
    },
    [UPDATE_PRODUCT_IN_CART](state, payload) {
      state.cart = state.cart.map((item) =>
        item.id === payload.id ? payload : item
      );
    },
    [REMOVE_PRODUCT_FROM_CART](state, payload) {
      state.cart = state.cart.filter((product) => product.id !== payload);
    },
    [TOGGLE_FAVORITE](state, payload) {
      const isExist = Boolean(
        state.favorites.find(
          (favoriteProduct) => favoriteProduct.id === payload.id
        )
      );

      if (isExist) {
        state.favorites = state.favorites.map((favoriteProduct) =>
          favoriteProduct.id === payload.id
            ? { ...favoriteProduct, marked: !favoriteProduct.marked }
            : favoriteProduct
        );
      } else {
        state.favorites = [...state.favorites, payload];
      }
    },
    [ACTUALIZE_FAVORITES](state) {
      state.favorites = state.favorites.filter(
        (favoriteProduct) => !favoriteProduct.marked
      );
    },
  },
  getters: {
    getProductList(state) {
      return state.list.map((product) => {
        const productInCart = state.cart.find(
          (cartProduct) => cartProduct.id === product.id
        );

        return {
          ...product,
          isAddedToCart: Boolean(productInCart),
          amount: productInCart?.amount || 0,
          isFavorite: state.favorites.some(
            (favoriteProduct) =>
              favoriteProduct.id === product.id && !favoriteProduct.marked
          ),
        };
      });
    },
    getCartList(state) {
      return state.cart.map((cartProduct) => ({
        ...cartProduct,
        isFavorite: state.favorites.some(
          (favoriteProduct) =>
            favoriteProduct.id === cartProduct.id && !favoriteProduct.marked
        ),
      }));
    },
    getCartCount(state) {
      return state.cart.reduce((acc, product) => acc + product.amount, 0);
    },
    getCartTotal(state) {
      return state.cart.reduce(
        (acc, product) => acc + product.price * product.amount,
        0
      );
    },
    getFavoritesList(state) {
      return state.favorites.map((favoriteProduct) => {
        const product = state.list.find(
          (product) => product.id === favoriteProduct.id
        );
        const productInCart = state.cart.find(
          (cartProduct) => cartProduct.id === favoriteProduct.id
        );

        return {
          ...product,
          isAddedToCart: Boolean(productInCart),
          amount: productInCart?.amount || 0,
          isFavorite: !favoriteProduct.marked,
        };
      });
    },
    getFavoritesListCount(state) {
      return state.favorites.filter((product) => !product.marked).length;
    },
  },
};
