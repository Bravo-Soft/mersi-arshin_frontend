import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';

import Layout from 'components/Layout';
import { AppRoutes } from 'constant/appRoutes';
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
