import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const CreateEtlEstimate = Loadable(lazy(() => import('./CreateEtlEstimate')));
const EditEtlEstimate = Loadable(lazy(() => import('./EditEtlEstimate')));
const EtlEstimateList = Loadable(lazy(() => import('./EtlEstimateList')));
const ViewEtlEstimate = Loadable(lazy(() => import('./ViewEtlEstimate')));

const EtlEstimateRoutes = [
  {
    path: '/etl/estimate-list',
    element: <EtlEstimateList />,
    permission: 'EtlView'
  },
  {
    path: '/etl/create-etl-estimate',
    element: <CreateEtlEstimate />,
    permission: 'EtlCreate'
  },
  {
    path: '/etl/edit-etl-estimate/:id',
    element: <EditEtlEstimate />,
    permission: 'EtlEdit'
  },
  {
    path: '/etl/view-etl-estimate/:id',
    element: <ViewEtlEstimate />,
    permission: 'EtlView'
  }
];

export default EtlEstimateRoutes;