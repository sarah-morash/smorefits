import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Head from 'next/head';

import ErrorMessage from '../components/ErrorMessage';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charges
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const countItemsInOrder = (order) =>
  order.items.reduce((tally, item) => tally + item.quantity, 0);

const OrdersPage = () => {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY, {});

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  const { allOrders } = data;

  return (
    <div>
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      <h2>You have {allOrders.length} orders!</h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles>
            <Link href={`/order/${order.id}`}>
              <>
                <div className="order-meta">
                  <p>
                    {countItemsInOrder(order)} Item
                    {order.items.length > 1 ? 's' : ''}
                  </p>
                  <p>
                    {order.items.length} Product
                    {order.items.length > 1 ? 's' : ''}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={`image-${item.id}`}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
};

export default OrdersPage;
