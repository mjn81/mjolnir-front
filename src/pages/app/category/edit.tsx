import React from 'react';
import { useParams } from 'react-router-dom';

const EditCategory = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default EditCategory;
