import React, { useState, useContext } from 'react';
import ItemContext from '../context/item/itemContext';

const ItemForm = () => {
  // Context
  const { addItem } = useContext(ItemContext);

  const defaultFormValues = {
    title: '',
    description: ''
  };

  // State
  const [item, setItem] = useState(defaultFormValues);
  const { title, description } = item;

  const onSubmit = e => {
    e.preventDefault();
    addItem(item);
    setItem(defaultFormValues);
  };

  const onChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add Item</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={onChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={description}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value={'Add Item'}
          className="btn btn-primary btn-block"
        />
      </div>
      {/* {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )} */}
    </form>
  );
};

export default ItemForm;
