import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const SubmitButton = styled.button`
  cursor: pointer;
`;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

const SignUp = () => {
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });
  const [signup, { data, error }] = useMutation(SIGNUP_MUTATION, {
    variables: { ...inputs },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signup().catch(console.error);

    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up for an Account</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - please go ahead and sign
            in!
          </p>
        )}
        <label htmlFor="name">
          <input
            type="name"
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Jon Smith"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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

        <SubmitButton type="submit">Sign Up</SubmitButton>
      </fieldset>
    </Form>
  );
};

export default SignUp;
