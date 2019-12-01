import React, { useContext } from "react";
import itemContext from "../../context/item/itemContext";

const ItemFilter = () => {
  const { setFilter, getItems } = useContext(itemContext);

  const onChange = e => {
    const filterText = e.target.value;
    setFilter(filterText);
    // getItems();
  };

  return (
    <form>
      <input type="text" placeholder="Filter Items..." onChange={onChange} />
    </form>
  );
};

export default ItemFilter;
