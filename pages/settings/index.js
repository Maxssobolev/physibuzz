import Header from "../../components/Header/Header";
import { LOGGEDIN_EMPLOYEE } from "../../components/Header/HeadersVariants";
import Layout from "../../components/Layout/Layout";
import LeftSidebar from "../../components/Layout/LeftSidebar/LeftSidebar";
import MainContent from "../../components/Layout/MainContent/MainContent";
import RightSidebar from "../../components/Layout/RightSidebar/RightSidebar";
import { Tab, Nav } from 'react-bootstrap'

//tabs
import SettingsGeneralTab from "../../components/Settings/Tabs/General";
import SettingsProfessionCoverLetterTab from "../../components/Settings/Tabs/ProfessionCoverLetter";
import SettingsSecurityTab from "../../components/Settings/Tabs/Security";
import SettingsTransactionHistoryTab from "../../components/Settings/Tabs/TransactionHistory";
import SettingsPaymentsTab from "../../components/Settings/Tabs/Payments";

export default function Settings() {
    const tabs = [
        { title: 'General', eventKey: 'General', component: SettingsGeneralTab },
        { title: 'Profession & Cover letter', eventKey: 'ProfessionCoverLetter', component: SettingsProfessionCoverLetterTab },
        { title: 'Security', eventKey: 'Security', component: SettingsSecurityTab },
        { title: 'Payments', eventKey: 'Payments', component: SettingsPaymentsTab },
        { title: 'Transaction History', eventKey: 'TransactionHistory', component: SettingsTransactionHistoryTab },
    ]

    return (
        <>
            <Header variant={LOGGEDIN_EMPLOYEE} />
            <div className="page page-settings">
                <Layout>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="General">
                        <LeftSidebar>
                            <div className="tabs-wrapper">
                                <Nav>
                                    {tabs.map((item, index) => (
                                        <div className="setting__item" key={`${index}__tab_links-settings`}>
                                            <Nav.Item>
                                                <Nav.Link eventKey={item.eventKey}>{item.title}</Nav.Link>
                                            </Nav.Item>
                                        </div>
                                    ))}
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
                                                    <RenderComponent title={item.title} />
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
