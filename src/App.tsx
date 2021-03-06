import { useState } from "react";
import { useQuery } from "react-query";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
//comps
import Item from "./Item/Item";
import Cart from "./Cart/Cart";

//estilos
import { Wrapper, StyledButton } from "./App.styles";
import { functionalUpdate } from "react-query/types/core/utils";
//tipos
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => //data returned from fetch item its an array
  //1 await for himself and another to convert to JSON
  await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]); //the type of the cartItem its defined here

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acumulator: number, item) => acumulator + item.amount, 0); //54:11

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prevState) => {
      //the item its already in the cart
      const isItemInCart = prevState.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prevState.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prevState, { ...clickedItem, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prevState) =>
      prevState.reduce((acumulator, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acumulator;
          return [...acumulator, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acumulator, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />; //os indicadores de progreso informan a los usuarios acerca del estado de procesos activos, tales como cargar una aplicación, enviar un formulario o guardar actualizaciones.
  if (error) return <div>Something went wrong ...</div>;
  return (
    <>
      <h1>Fake Store</h1>
      <p>Hi, i'm Ivan Rubio this is an app that simulates a onLine store</p>
      <p>This is a version of the tutorial</p>
      <a href="https://www.youtube.com/watch?v=sfmL6bGbiN8&t=903s">
        {" "}
        Build a Shopping Cart with React and TypeScript by Tomas Weber
      </a>
      <p>
        {" "}
        The idea is to Learn the fundamentals of Typescript, Material UI, Styled
        Components and React-Query
      </p>
      <Wrapper>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color="error"></Badge>
          <AddShoppingCartIcon />
        </StyledButton>
        <Grid container spacing={3}>
          {data?.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </>
  );
};

export default App;
