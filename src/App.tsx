import { useState } from "react";
import { useQuery } from "react-query";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";

import Item from "./Item/Item";

//estilos
import { Wrapper, StyledButton } from "./App.styles";
import { functionalUpdate } from "react-query/types/core/utils";

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
  const [cartItem, setCartItem] = useState([] as CartItemType[]); //the type of the cartItem its defined here

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  const getTotalItems = (items: CartItemType[]) => null;
  const handleAddToCart = (clickedItem: CartItemType) => null;
  const handleRemoveFromCart = () => null;
  if (isLoading) return <LinearProgress />; //os indicadores de progreso informan a los usuarios acerca del estado de procesos activos, tales como cargar una aplicación, enviar un formulario o guardar actualizaciones.
  if (error) return <div>Something went wrong ...</div>;
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <p>Carto Goes here</p>
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItem)} color="error"></Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
