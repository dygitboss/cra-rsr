import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authorizedUserSelector } from '../../../store/auth/selectors';

const ProtectedRoute = ({ children }) => {
  const [user] = useSelector(authorizedUserSelector);

  return user ? children : <Redirect to='/login' />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.elementType.isRequired,
};
