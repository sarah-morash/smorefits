import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';

const SubmitButton = styled.button`
  cursor: pointer;
`;

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestReset = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [requestReset, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await requestReset().catch(console.error);
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a password reset</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
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

        <SubmitButton type="submit" aria-disabled={loading}>
          Request Reset
        </SubmitButton>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
