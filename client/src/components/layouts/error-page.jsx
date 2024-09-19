import Layout from "./layout"
import { H1 } from "../Typography"

export default function ErrorPage() {
  return(
    <Layout>
      <div className='flex items-center justify-center min-h-screen'>
        <div className="mt-[-140px]">
          <H1>404 | This page could not be found!</H1>
        </div>
      </div>
    </Layout>
  )
}