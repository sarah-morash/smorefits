import CreateProduct from '../components/CreateProduct';
import PleaseSignIn from '../components/PleaseSignIn';

const Sell = () => (
  <div>
    <PleaseSignIn>
      <CreateProduct />
    </PleaseSignIn>
  </div>
);

export default Sell;
