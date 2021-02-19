import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { authorizedUserSelector } from '../../../store/auth/selectors';
import { fetchAuthorizedUser } from '../../../store/auth/actions';

const AuthorizedLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [user] = useSelector(authorizedUserSelector);

  useEffect(() => {
    if (!user) dispatch(fetchAuthorizedUser());
  }, [user, dispatch]);

  return (
    <>
      { children }
    </>
  );
};

AuthorizedLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

export default AuthorizedLayout;
