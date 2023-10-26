import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';

import Layout from 'components/Layout';
import { AppRoutes } from 'constant/appRoutes';
import QuickTour from 'features/quickTour/components/QuickTour';
import { ArshinIntegrationPageLazy } from 'pages/arshin-integration';
import { AuthPage } from 'pages/auth';
import ErrorPage from 'pages/error/ErrorPage';
import { HomePage } from 'pages/home';
import { InitPage } from 'pages/init';
import { PrintPage } from 'pages/print';

const config: RouteObject[] = [
	{
		element: <Layout />,
		errorElement: <ErrorPage />,

		children: [
			{
				path: '/',
				element: <InitPage />,
			},
			{
				path: AppRoutes.AUTH,
				element: <AuthPage />,
			},
			{
				path: AppRoutes.HOME,
				element: (
					<PrivateRoute>
						<QuickTour>
							<HomePage />
						</QuickTour>
					</PrivateRoute>
				),
			},
			{
				path: AppRoutes.PRINT,
				element: (
					<PrivateRoute>
						<PrintPage />
					</PrivateRoute>
				),
			},
			{
				path: AppRoutes.ARSHIN,
				element: (
					<PrivateRoute>
						<ArshinIntegrationPageLazy />
					</PrivateRoute>
				),
			},
		],
	},
];

export const router = createBrowserRouter(config);
