import { RouterProvider } from 'react-router-dom';
import { router } from './config';

export function AppRouter() {
	return <RouterProvider router={router} />;
}
