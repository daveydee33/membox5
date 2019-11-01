import React, { useContext, useEffect, Fragment } from 'react';
import itemContext from '../../context/item/itemContext';
import Item from './Item';

const ItemList = () => {
  // Context
  const { getItems, items } = useContext(itemContext);

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);

  if (items !== null && items.length === 0) {
    return <h4>Add some items to get started</h4>;
  }

  return (
    <Fragment>
      <h1>Item List</h1>
      {items.map(item => (
        <Item key={item._id} item={item} />
      ))}
    </Fragment>
  );
};

export default ItemList;
