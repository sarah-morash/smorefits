import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const SubmitButton = styled.button`
  cursor: pointer;
`;

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

const Reset = ({ token }) => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the form from submitting
    const res = await reset().catch(console.error);
    resetForm();
    // Send the email and password to the graphqlAPI
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset your password</h2>
      <DisplayError error={error || successfulError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in</p>
        )}
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="test@email.com"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <SubmitButton type="submit">Request Reset</SubmitButton>
      </fieldset>
    </Form>
  );
};

export default Reset;
