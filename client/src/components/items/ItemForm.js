import React, { useState, useContext, useEffect } from 'react';
import itemContext from '../../context/item/itemContext';
import CreatableSelect from 'react-select/creatable';
import { tagOptions } from '../../constants.js';

const ItemForm = () => {
  // Context
  const { addItem, updateItem, current, clearCurrent } = useContext(
    itemContext,
  );

  const defaultFormValues = {
    title: '',
    description: '',
  };

  // State
  const [item, setItem] = useState(defaultFormValues);

  const { title, description } = item;

  const handleTagChange = newValue => {
    console.log('handleTagChange', newValue); // #TODO
  };

  useEffect(() => {
    if (current) {
      setItem(current);
    } else {
      setItem(defaultFormValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemContext, current]);

  const onChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current) {
      updateItem(item);
    } else {
      addItem(item);
    }
    setItem(defaultFormValues);
    clearCurrent();
  };

  const cancelEdit = () => clearCurrent();

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Item' : 'Add Item'}</h2>
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
      <CreatableSelect
        isClearable
        isMulti
        onChange={handleTagChange}
        options={tagOptions}
      />
      <div>
        {current && (
          <button className="btn btn-light btn-block" onClick={cancelEdit}>
            Cancel
          </button>
        )}
        <input
          type="submit"
          value={current ? 'Save Edits' : 'Add'}
          className={
            current ? 'btn btn-block btn-dark' : 'btn btn-block btn-primary'
          }
        />
      </div>
    </form>
  );
};

export default ItemForm;
