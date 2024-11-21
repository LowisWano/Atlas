import Layout from "./layout"
import { H1 } from "../Typography"
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return(
    <Layout>
      <div className='flex items-center justify-center min-h-screen'>
        <div className="mt-[-140px] text-center flex gap-4 flex-col">
          <H1>Oops!</H1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </div>
    </Layout>
  )
}