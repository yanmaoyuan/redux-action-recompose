import React from 'react';
import Users from './users';
import Todos from './todos';
import './app.scss';

const Demo = () => (
  <div className='container'>
    <Users />
    <hr />
    <Todos />
  </div>
);

export default Demo;
