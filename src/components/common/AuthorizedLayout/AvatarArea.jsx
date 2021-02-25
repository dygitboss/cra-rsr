import { useMemo, useCallback } from 'react';
import {
  Avatar, Dropdown, Menu, message,
} from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import ROUTES from 'config/routes';
import styles from './AuthorizedLayout.module.scss';
import { authorizedUserSelector } from '../../../store/auth/selectors';
import { logout as logoutAction } from '../../../store/auth/actions';

const ITEMS = [
  // { icon: SettingOutlined, title: 'Settings', route: '/settings' },
  // { divider: true },
  { icon: LogoutOutlined, title: 'Logout', logout: true },
];

const AvatarArea = () => {
  const dispatch = useDispatch();
  const [user] = useSelector(authorizedUserSelector);
  const history = useHistory();

  const logout = useCallback(async () => {
    const { error } = await dispatch(logoutAction());
    if (error) {
      message.error('Unable to log out');
    } else {
      await history.replace(ROUTES.LOGIN);
    }
  }, [history, dispatch]);

  const menu = useMemo(() => (
    <Menu>
      {
        ITEMS.map((item, idx) => {
          if (item.logout) {
            return (
              <Menu.Item key={idx.toString()} onClick={logout} icon={<item.icon />}>{ item.title }</Menu.Item>
            );
          }
          if (item.divider) return <Menu.Divider key={idx.toString()} />;
          return (
            <Menu.Item key={idx.toString()} icon={<item.icon />}>
              <Link to={item.route}>
                { item.title }
              </Link>
            </Menu.Item>
          );
        })
      }
    </Menu>
  ), [logout]);

  return (
    <Dropdown overlay={menu}>
      <div className={styles.avatarWrap}>
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} src={user?.avatar?.url} />
        <span>{ user?.name }</span>
      </div>
    </Dropdown>
  );
};

export default AvatarArea;
