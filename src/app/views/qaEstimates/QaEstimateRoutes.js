import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const CreateQaEstimate = Loadable(lazy(() => import('./CreateQaEstimate')));
const EditQaEstimate = Loadable(lazy(() => import('./EditQaEstimate')));
const QaEstimateList = Loadable(lazy(() => import('./QaEstimateList')));
const ViewQaEstimate = Loadable(lazy(() => import('./ViewQaEstimate')));

const qaEstimateRoutes = [
  {
    path: '/qa/estimate-list',
    element: <QaEstimateList />,
    permission: 'QaView'
  },
  {
    path: '/qa/create-qa-estimate',
    element: <CreateQaEstimate />,
    permission: 'QaCreate'
  },
  {
    path: '/qa/edit-qa-estimate/:id',
    element: <EditQaEstimate />,
    permission: 'QaEdit'
  },
  {
    path: '/qa/view-qa-estimate/:id',
    element: <ViewQaEstimate />,
    permission: 'QaView'
  }
];

export default qaEstimateRoutes;