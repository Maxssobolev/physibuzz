import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import LeftSidebar from "../../components/Layout/LeftSidebar/LeftSidebar";
import MainContent from "../../components/Layout/MainContent/MainContent";
import RightSidebar from "../../components/Layout/RightSidebar/RightSidebar";
import { Tab, Nav } from 'react-bootstrap'
import useCurrentUser from '../../components/Hooks/useCurrentUser'

//tabs
import SettingsGeneralTab from "../../components/Settings/Tabs/General";
import SettingsProfessionCoverLetterTab from "../../components/Settings/Tabs/ProfessionCoverLetter";
import SettingsSecurityTab from "../../components/Settings/Tabs/Security";
import SettingsTransactionHistoryTab from "../../components/Settings/Tabs/TransactionHistory";
import SettingsPaymentsTab from "../../components/Settings/Tabs/Payments";
import { useWindowDimensions } from "../../components/Hooks/useWindowDimensions";

export default function Settings() {

    const user = useCurrentUser()
    const isMobile = useWindowDimensions().width <= 425

    const tabs = [
        { title: 'General', eventKey: 'General', component: SettingsGeneralTab },
        { title: 'Profession & Cover letter', eventKey: 'ProfessionCoverLetter', component: SettingsProfessionCoverLetterTab },
        { title: 'Security', eventKey: 'Security', component: SettingsSecurityTab },
        { title: 'Payments', eventKey: 'Payments', component: SettingsPaymentsTab },
        { title: 'Transaction History', eventKey: 'TransactionHistory', component: SettingsTransactionHistoryTab },
    ]

    if (isMobile) {
        return (
            <>
                <Header />
                <div className="page page-settings">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="General">
                        <LeftSidebar>
                            <div className="tabs-wrapper">
                                <Nav>
                                    {tabs.map((item, index) => {
                                        if (!(item.title == 'Profession & Cover letter' && user?.type == 'hiring'))
                                            return (
                                                <div className="setting__item" key={`${index}__tab_links-settings`}>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey={item.eventKey}>{item.title}</Nav.Link>
                                                    </Nav.Item>
                                                </div>)
                                    })}
                                </Nav>
                            </div>
                        </LeftSidebar>
                        <MainContent>
                            <div className="tab-wrapper">
                                <Tab.Content>
                                    {tabs.map((item, index) => {
                                        const RenderComponent = item.component || null
                                        if (RenderComponent) {
                                            return (
                                                <Tab.Pane eventKey={item.eventKey} key={`${index}__tab_content-settings`}>
                                                    <RenderComponent title={item.title} user={user} />
                                                </Tab.Pane>
                                            )
                                        }
                                    })}
                                </Tab.Content>
                            </div>
                        </MainContent>
                        <RightSidebar />
                    </Tab.Container>
                </div>
            </>
        )
    }
    return (
        <>
            <Header />
            <div className="page page-settings">
                <Layout>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="General">
                        <LeftSidebar>
                            <div className="tabs-wrapper">
                                <Nav>
                                    {tabs.map((item, index) => {
                                        if (!(item.title == 'Profession & Cover letter' && user?.type == 'hiring'))
                                            return (
                                                <div className="setting__item" key={`${index}__tab_links-settings`}>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey={item.eventKey}>{item.title}</Nav.Link>
                                                    </Nav.Item>
                                                </div>)
                                    })}
                                </Nav>
                            </div>
                        </LeftSidebar>
                        <MainContent>
                            <div className="tab-wrapper">
                                <Tab.Content>
                                    {tabs.map((item, index) => {
                                        const RenderComponent = item.component || null
                                        if (RenderComponent) {
                                            return (
                                                <Tab.Pane eventKey={item.eventKey} key={`${index}__tab_content-settings`}>
                                                    <RenderComponent title={item.title} user={user} />
                                                </Tab.Pane>
                                            )
                                        }
                                    })}
                                </Tab.Content>
                            </div>
                        </MainContent>
                        <RightSidebar />
                    </Tab.Container>
                </Layout>
            </div>
        </>
    )
}
