import React, { useState } from "react";

const PasswordShowHide = ({ field, form }) => {
    const [showHidePassword, changeShowHidePassword] = useState(false);
    const hasError = form.touched[field.name] && form.errors[field.name];

    return (
        <div className="field_password-wrapper">
            <span
                className='field_password-eyeIcon'
                onClick={() => changeShowHidePassword(!showHidePassword)}
            >
                {showHidePassword ? (
                    'Hide'
                ) : (
                    'Show'
                )}
            </span>
            <input
                type={showHidePassword ? "text" : "password"}
                {...field}
                className="field field_password"
            />
        </div>
    );
};

export default PasswordShowHide;
