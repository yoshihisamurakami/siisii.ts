import { AmplifySignOut } from '@aws-amplify/ui-react';

const SignoutWrapper = () => {
  return (
    <div className="row">
      <div className="col"></div>
      <div className="col">
        <AmplifySignOut />
      </div>
      <div className="col"></div>
    </div>
  );
};

export default SignoutWrapper;
