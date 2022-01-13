import Header from "../components/Header/Header"
import { LOGGEDIN_HEADER } from "../components/Header/HeadersVariants"
//home page
export default function Home() {
  return (
    <>
      <Header variant={LOGGEDIN_HEADER} />
      <div className="page page-home">



      </div>
    </>
  )
}
