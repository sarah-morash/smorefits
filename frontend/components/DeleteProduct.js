import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
`;

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DeleteProduct = ({ id, children }) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });

  return (
    <Button
      type="button"
      disabled={loading}
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this item?')) {
          deleteProduct().catch((e) => console.error(e));
        }
      }}
    >
      {children}&nbsp;&nbsp;🗑️
    </Button>
  );
};

export default DeleteProduct;
