import Button from "@material-ui/core/Button";
// Types
import { CartItemType } from "../App";
// Styles
import { Wrapper } from "./CartItem.styles";

//tipos
type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

//When creating a functional component in TypeScript we first need to use the type React.FC , which is based on the FunctionComponent interface: React. FC makes sure the signature of our function is correct and the return value is valid JSX
const CartItem: React.FC<Props> = () => <div>Cart Item</div>;

export default CartItem;
