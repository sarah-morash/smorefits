import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

const ResetPage = ({ query }) => {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry, you muyst supply token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset your password</p>
      <Reset token={query.token} />
    </div>
  );
};

export default ResetPage;
