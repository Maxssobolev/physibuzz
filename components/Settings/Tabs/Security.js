import SecurityForm from "../../Forms/SettingsForms/SecurityForm/SecurityForm";

export default function SettingsSecurityTab({ title, user }) {

    return (
        <>
            <div className="settings-tab-header">
                {title}
            </div>
            <div className="settings-tab-content">
                <SecurityForm user={user} />
            </div>
        </>
    )
}