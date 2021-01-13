import React from 'react'
import { Top } from '../pages/top/Top'

const routes = [
  {
    path: '/',
    exact: true,
    children: <Top />,
    component: Top,
  },
]

export default routes