import { Outlet } from 'react-router-dom';
import Layout from '@/components/layouts/layout';

function App() {
  return (
    <>
      <Layout>
        <main>
          {/* Child routes (like Login) will be rendered here */}
          <Outlet />
        </main>
      </Layout>
    </>
  )
}

export default App
