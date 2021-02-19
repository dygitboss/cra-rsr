import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  Row, Col, Form, Checkbox, Button, Input,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import styles from './Register.module.scss';
import { authorize } from '../../store/auth/actions';

const Register = () => {
  const dispatch = useDispatch();
  const router = useHistory();
  const [form] = Form.useForm();

  const submit = useCallback(async ({ email, password }) => {
    const { data, error } = await dispatch(authorize(email, password));
    if (data) await router.push('/users');
    if (error) form.setFields([{ name: 'password', errors: ['Invalid credentials'] }]);
  }, [dispatch, router, form]);

  return (
    <Row className={styles.container}>
      <Col span={14} className={styles.left} />
      <Col span={10} className={styles.right}>
        <Form
          name='login'
          form={form}
          initialValues={{ remember: true }}
          onFinish={submit}
        >
          <Form.Item
            name='email'
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input prefix={<UserOutlined className={styles.icon} />} placeholder='Email' type='email' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className={styles.icon} />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Button type='link' className={styles.forgot}>
              Forgot password
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className={styles.button}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
