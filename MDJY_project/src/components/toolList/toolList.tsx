import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import React from 'react';

class UserTable extends Table<User> {}

export interface testProps {
  onDelete: any;
  listParam: {
    toolList: User[];
  };
}

interface User {
  key: string;
  name: string;
}

const toolList = ({ onDelete, listParam: { toolList } }: testProps) => {
  console.log(toolList);
  const columns: ColumnProps<User>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a onClick={() => onDelete(123)}>Delete</a>,
    },
  ];
  console.log(onDelete);
  return <UserTable dataSource={toolList} columns={columns} key={toolList.length} />;
};

export default toolList;
