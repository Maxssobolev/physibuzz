import ProfessionCoverLetterForm from "../../Forms/SettingsForms/ProfessionCoverLetterForm/ProfessionCoverLetterForm";

export default function SettingsProfessionCoverLetterTab({ title, user }) {

    return (
        <>
            <div className="settings-tab-header">
                {title}
            </div>
            <div className="settings-tab-content">
                <ProfessionCoverLetterForm user={user} />
            </div>
        </>
    )
}