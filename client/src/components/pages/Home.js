import React, { Fragment } from 'react';
import ItemForm from '../items/ItemForm';
import ItemList from '../items/ItemList';

const Home = () => {
  return (
    <Fragment>
      <ItemForm />
      <ItemList />
    </Fragment>
  );
};

export default Home;
