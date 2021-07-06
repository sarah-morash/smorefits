import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

const SubmitButton = styled.button`
  cursor: pointer;
`;

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const SignIn = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // refetch currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signin();
    resetForm();
  };

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <DisplayError error={error} />
      <fieldset>
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

        <SubmitButton type="submit">Sign In</SubmitButton>
      </fieldset>
    </Form>
  );
};

export default SignIn;
