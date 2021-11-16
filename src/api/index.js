import axios from "axios";
import { endpoints } from "./endpoints";
import { enhanceProducts } from "./enhancer";

const SHOP_SIZE = 30;

export default {
  async products() {
    try {
      const { data } = await axios.get(endpoints.products(SHOP_SIZE));

      return enhanceProducts(data);
    } catch {
      return [];
    }
  },
};
