import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import itemContext from '../../context/item/itemContext';

const Item = ({ item }) => {
  const { _id, title, description } = item;

  // Context
  const { deleteItem } = useContext(itemContext);

  const onEdit = () => {
    //Edit
  };

  const onDelete = () => {
    deleteItem(_id);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">{title}</h3>
      {description}
      <p>
        <button className="btn btn-dark btn-sm" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default Item;
