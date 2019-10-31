import React from 'react';

const ItemForm = () => {
  const onSubmit = () => {
    console.log('Submit...');
  };

  const onChange = () => {
    console.log('Change.');
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add Item</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        // value={name}
        onChange={onChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Description"
        // value={email}
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
