import { useState } from "react";
import { useQuery } from "react-query";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";

import { Wrapper } from "./App.styles";
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
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  const getTotalitem = () => null;
  const handleAddToCart = () => null;
  const handleRemoveFromCart = () => null;
  if (isLoading) return <LinearProgress />; //os indicadores de progreso informan a los usuarios acerca del estado de procesos activos, tales como cargar una aplicación, enviar un formulario o guardar actualizaciones.
  console.log(data);
  return <div className="App">Start</div>;
};

export default App;
