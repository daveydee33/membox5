import React, { useState, useContext } from 'react';
import itemContext from '../../context/item/itemContext';

const ItemForm = () => {
  // Context
  const { addItem } = useContext(itemContext);

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
      <textarea
        name="description"
        placeholder="Description"
        value={description}
        onChange={onChange}
        rows="5"
      ></textarea>
      <div>
        <input
          type="submit"
          value={'Add Item'}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ItemForm;
