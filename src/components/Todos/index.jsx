import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';

import { useFilters, usePagination } from '../../utils/hooks';
import { fetchTodos } from '../../store/todos/actions';
import { todosSelector } from '../../store/todos/selectors';

const COLUMNS = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Completed',
    dataIndex: 'completed',
  },
];

const Todos = () => {
  const dispatch = useDispatch();
  const [todos, total, loading] = useSelector(todosSelector);
  const [pagination, paginationOptions] = usePagination();
  const [filters, sorting, filterOptions] = useFilters(COLUMNS, {});

  useEffect(() => {
    dispatch(fetchTodos({
      ...pagination, filters, sorting,
    }));
  }, [dispatch, pagination, filters, sorting]);

  return (
    <Table
      loading={loading}
      dataSource={todos}
      pagination={{
        total,
        ...paginationOptions,
      }}
      {...filterOptions}
    />
  );
};

export default Todos;
