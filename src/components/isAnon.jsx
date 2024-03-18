import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';

const IsAnon = props => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    <p>Loading...</p>;
  }

  if (isLoggedIn) {
    //if the user is not logged in
    return <Navigate to={'/'} />;
  } else {
    return props.children;
  }
};

export default IsAnon;
