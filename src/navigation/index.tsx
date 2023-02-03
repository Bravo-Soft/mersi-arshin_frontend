import Fallback from 'components/Fallback';
import Layout from 'components/Layout';
import PreventNavigateAuth from './PreventNavigateAuth';
import PrivateRoute from './PrivateRoute';

import { AppRoutes } from 'constant/appRoutes';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const AuthPage = lazy(() => import('pages/AuthPage'));
const HomePage = lazy(() => import('pages/HomePage'));
const PrintPage = lazy(() => import('pages/PrintPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

function Navigation(): JSX.Element {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Navigate to={AppRoutes.HOME} replace />} />
				<Route
					path={AppRoutes.AUTH}
					element={
						<PreventNavigateAuth>
							<Suspense fallback={<Fallback />}>
								<AuthPage />
							</Suspense>
						</PreventNavigateAuth>
					}
				/>
				<Route
					path={AppRoutes.HOME}
					element={
						<PrivateRoute>
							<Suspense fallback={<Fallback />}>
								<HomePage />
							</Suspense>
						</PrivateRoute>
					}
				/>
				<Route
					path={AppRoutes.PRINT}
					element={
						<PrivateRoute>
							<Suspense fallback={<Fallback />}>
								<PrintPage />
							</Suspense>
						</PrivateRoute>
					}
				/>
			</Route>
			<Route
				path={AppRoutes.NOT_FOUND}
				element={
					<Suspense fallback={<Fallback />}>
						<NotFoundPage />
					</Suspense>
				}
			/>
		</Routes>
	);
}

export default Navigation;
