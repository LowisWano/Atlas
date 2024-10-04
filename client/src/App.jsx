import { Outlet,useLocation } from 'react-router-dom';
import Layout from '@/components/layouts/layout';
import { ThemeProvider } from './components/theme-provider';

function App() {
  const location = useLocation();
  const hideLayoutPaths = ['/login', '/signup'];

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {hideLayoutPaths.includes(location.pathname) ? (
        <main>
          <Outlet />
        </main>
      ) : (
        <Layout>
          <main>
            <Outlet />
          </main>
        </Layout>
      )}
    </ThemeProvider>
  );
}

export default App
