import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, CheckCircleOutlined, MinusOutlined } from '@ant-design/icons';
import {
  Table, Button, Popconfirm, message,
} from 'antd';

import { useFilters, usePagination } from '../../utils/hooks';
import { deleteTodo, fetchTodos, updateTodo } from '../../store/todos/actions';
import { todosSelector } from '../../store/todos/selectors';

const COLUMNS = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Completed',
    dataIndex: 'completed',
    render: (v) => (v ? (<CheckCircleOutlined />) : <MinusOutlined />),
  },
  {
    title: 'Actions',
    render: (v, record) => (
      <>
        { !record.completed && (
          <Popconfirm title='Sure to complete?' onConfirm={() => record.handleComplete(record.id)}>
            <Button type='link' icon={<CheckCircleOutlined />}>
              Complete
            </Button>
          </Popconfirm>
        ) }
        <Popconfirm title='Sure to delete?' onConfirm={() => record.handleDelete(record.id)}>
          <Button type='link' danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      </>
    ),
  },
];

const Todos = () => {
  const dispatch = useDispatch();
  const [todos, total, loading] = useSelector(todosSelector);
  const [pagination, paginationOptions] = usePagination();
  const [filters, sorting, filterOptions] = useFilters(COLUMNS, {});

  const fetchData = useCallback(() => {
    dispatch(fetchTodos({
      ...pagination, filters, sorting,
    }));
  }, [dispatch, filters, pagination, sorting]);

  const handleComplete = useCallback(async (id) => {
    const { data, error } = await dispatch(updateTodo(id, { completed: 1 }));
    if (data) {
      message.success(data);
      fetchData();
    }
    if (error) message.error('Unable to delete todo');
  }, [dispatch, fetchData]);

  const handleDelete = useCallback(async (id) => {
    const { data, error } = await dispatch(deleteTodo(id));
    if (data) {
      message.success(data);
      fetchData();
    }
    if (error) message.error('Unable to delete todo');
  }, [dispatch, fetchData]);

  const dataSource = useMemo(
    () => todos.map((item) => ({ ...item, handleDelete, handleComplete })),
    [todos, handleDelete, handleComplete],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Table
      loading={loading}
      dataSource={dataSource}
      pagination={{
        total,
        ...paginationOptions,
      }}
      {...filterOptions}
    />
  );
};

export default Todos;
