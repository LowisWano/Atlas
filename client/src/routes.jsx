import App from './App.jsx'
import Dashboard from './pages/dashboard/index.jsx';
import Login from './pages/login/index.jsx';
import Signup from './pages/signup/index.jsx'
import ErrorPage from './components/layouts/error-page.jsx';

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
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