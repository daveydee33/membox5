import React, { useContext, useEffect, Fragment } from 'react';
import itemContext from '../../context/item/itemContext';
import Item from './Item';
import Spinner from '../layout/Spinner';

const ItemList = () => {
  // Context
  const { getItems, items, loading } = useContext(itemContext);

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (items.length === 0) {
    return <h4>Add some items to get started</h4>;
  }

  return (
    <Fragment>
      <h1>
        Item List
        <span style={{ float: 'right' }}>Count: {items.length}</span>
      </h1>

      {items.map(item => (
        <Item key={item._id} item={item} />
      ))}
    </Fragment>
  );
};

export default ItemList;
