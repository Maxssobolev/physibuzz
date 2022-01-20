import Layout from '../../components/Layout/Layout'
import LeftSidebar from '../../components/Layout/LeftSidebar/LeftSidebar'
import MainContent from '../../components/Layout/MainContent/MainContent'
import RightSidebar from '../../components/Layout/RightSidebar/RightSidebar'
import Header from '../../components/Header/Header'
import { LOGGEDIN_HEADER } from '../../components/Header/HeadersVariants'


export default function ViewVacancy() {


    return (
        <>
            <Header variant={LOGGEDIN_HEADER} />
            <div className="page page-cv">
                <Layout>
                    <LeftSidebar />
                    <MainContent>


                        <div className="cv-wrapper">

                        </div>


                    </MainContent>
                    <RightSidebar />
                </Layout>
            </div>
        </>
    )
}