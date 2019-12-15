import React, { useContext, useEffect, useState, Fragment } from 'react';
import itemContext from '../../context/item/itemContext';
import Item from './Item';
import Spinner from '../layout/Spinner';

const ItemList = () => {
  // Context
  const { getItems, items, loading } = useContext(itemContext);

  // State
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (items.length === 0) {
    return <h4>Add some items to get started</h4>;
  }

  const onChangeFilter = e => {
    const filter = e.target.value;
    if (!filter) {
      setFilter(null);
    } else {
      setFilter(filter);
    }
  };

  const regex = new RegExp(filter, 'gi');
  const itemsFiltered = !filter
    ? items
    : items.filter(item => {
        return item.title.match(regex) || item.description.match(regex);
      });

  return (
    <Fragment>
      <form>
        <input
          type="text"
          placeholder="Filter Items..."
          onChange={onChangeFilter}
        />
      </form>

      <h1>
        Item List
        <span style={{ float: 'right' }}>Count: {itemsFiltered.length}</span>
      </h1>

      {itemsFiltered.map(item => (
        <Item key={item._id} item={item} />
      ))}
    </Fragment>
  );
};

export default ItemList;
