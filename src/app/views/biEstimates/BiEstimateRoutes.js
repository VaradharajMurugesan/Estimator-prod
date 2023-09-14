import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

// const CreateBiEstimate = Loadable(lazy(() => import('./CreateBiEstimate1')));
const CreateBiEstimate = Loadable(lazy(() => import('./CreateBiEstimate')));
const EditBiEstimate = Loadable(lazy(() => import('./EditBiEstimate')));
const BiEstimateList = Loadable(lazy(() => import('./BiEstimateList')));
const ViewBiEstimate = Loadable(lazy(() => import('./ViewBiEstimate')));

const biEstimateRoutes = [
  {
    path: '/bi/estimate-list',
    element: <BiEstimateList />,
    permission: 'BiView'
  },
  {
    path: '/bi/create-bi-estimate',
    element: <CreateBiEstimate />,
    permission: 'BiCreate'
  },
  {
    path: '/bi/edit-bi-estimate/:id',
    element: <EditBiEstimate />,
    permission: 'BiEdit'
  },
  {
    path: '/bi/view-bi-estimate/:id',
    element: <ViewBiEstimate />,
    permission: 'BiView'
  }
];

export default biEstimateRoutes;