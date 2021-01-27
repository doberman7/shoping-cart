import CartItem from "../CartItem/CartItem";

import { Wrapper } from "./Cart.styles";

import { CartItemType } from "../App";

type props = {
  item: CartItemType;
  addToCart: (clikedItem: CartItemType) => void;
  removeFromCart: (ad: number) => void;
};
