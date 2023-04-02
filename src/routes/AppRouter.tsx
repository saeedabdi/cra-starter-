import { HomePage } from 'page';
import { useRoutes } from 'react-router-dom';

export default function AppRouter() {
  const appRoutes = {
    HOME: '/',
  };
  return useRoutes([
    {
      path: appRoutes.HOME,
      element: <HomePage />,
    },
  ]);
}
