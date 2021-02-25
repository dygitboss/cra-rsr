import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';

import styles from './AuthorizedLayout.module.scss';
import AvatarArea from './AvatarArea';
import { authorizedUserSelector } from '../../../store/auth/selectors';
import { fetchAuthorizedUser } from '../../../store/auth/actions';

const AuthorizedLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [user] = useSelector(authorizedUserSelector);

  useEffect(() => {
    if (!user) dispatch(fetchAuthorizedUser());
  }, [user, dispatch]);

  return (
    <Layout>
      <Layout.Header className={classNames(styles.background, styles.header)}>
        <AvatarArea />
      </Layout.Header>
      <Layout.Content className={styles.container}>
        { children }
      </Layout.Content>
    </Layout>
  );
};

AuthorizedLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

export default AuthorizedLayout;
