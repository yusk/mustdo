import React from 'react'
import { Top } from '../pages/top/Top'
import { History } from '../pages/history/History'

const routes = [
  {
    path: '/',
    exact: true,
    children: <Top />,
    component: Top,
  },
  {
    path: '/history',
    exact: true,
    children: <History />,
    component: History,
  }
]

export default routes