import React, { Fragment } from "react";
import ItemForm from "../items/ItemForm";
import ItemFilter from "../items/ItemFilter";
import ItemList from "../items/ItemList";

const Home = () => {
  return (
    <Fragment>
      <ItemForm />
      <ItemFilter />
      <ItemList />
    </Fragment>
  );
};

export default Home;
