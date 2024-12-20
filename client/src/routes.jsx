import App from './App.jsx'
import Dashboard from './pages/dashboard/index.jsx';
import Login from './pages/login/index.jsx';
import Signup from './pages/signup/index.jsx'
import ErrorPage from './components/layouts/error-page.jsx';
import ProtectedRoutes from './components/layouts/protected-routes.jsx';
import Calendar from './pages/calendar/index.jsx';
import Shop from './pages/shop/index.jsx';
import Achievements from './pages/achievements/index.jsx';
import Profile from './pages/profile/index.jsx';

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoutes />,  // Protects all nested routes
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "calendar",
            element: <Calendar />,
          },
          {
            path: "shop",
            element: <Shop />,
          },
          {
            path: "achievements",
            element: <Achievements />
          },
          {
            path: "profile",
            element: <Profile />
          }
          // Add more protected routes here
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      }
    ]
  }
]

export default routes;