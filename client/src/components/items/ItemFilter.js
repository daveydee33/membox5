import React, { useContext } from 'react';
import itemContext from '../../context/item/itemContext';

const ItemFilter = () => {
  const { clearFilter, filterItems } = useContext(itemContext);

  const onChange = e => {
    const filter = e.target.value;
    if (!filter) {
      clearFilter();
    } else {
      filterItems(filter);
    }
  };

  return (
    <form>
      <input type="text" placeholder="Filter Items..." onChange={onChange} />
    </form>
  );
};

export default ItemFilter;
