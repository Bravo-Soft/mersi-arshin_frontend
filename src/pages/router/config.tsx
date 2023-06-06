import type { RouteObject } from 'react-router-dom';

import Layout from 'components/Layout';
import ErrorPage from 'pages/error/ErrorPage';

import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from 'constant/appRoutes';
import { AuthPage } from 'pages/auth';
import { HomePage } from 'pages/home';
import { PrintPage } from 'pages/print';
import { InitPage } from 'pages/init';
import { PrivateRoute } from './PrivateRoute';

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
						<HomePage />
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
		],
	},
];

export const router = createBrowserRouter(config);
