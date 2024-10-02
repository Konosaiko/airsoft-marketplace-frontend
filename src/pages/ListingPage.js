import React from 'react';
import { useParams } from 'react-router-dom';

function ListingPage() {
  let { id } = useParams();
  return <div>Listing Page for ID: {id}</div>;
}

export default ListingPage;