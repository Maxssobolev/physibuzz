import GeneralForm from "../../Forms/SettingsForms/GeneralForm/GeneralForm";

export default function SettingsGeneralTab({ title, user }) {

    return (
        <>
            <div className="settings-tab-header">
                {title}
            </div>
            <div className="settings-tab-content">
                <GeneralForm user={user} />
            </div>
        </>
    )
}