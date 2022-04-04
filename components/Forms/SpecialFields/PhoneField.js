import PhoneFormatter from "react-headless-phone-input";
import { useField, useFormikContext } from "formik";
import Flags from "country-flag-icons/react/3x2";
import { FieldTitle } from "./FieldTitle";

export const PhoneField = ({ ...props }) => {
    const { setFieldValue, setFieldTouched } = useFormikContext();
    const [field] = useField(props);
    return (<PhoneFormatter
        {...field}
        {...props}
        className="myPhoneField"
        name={field.name}
        value={field.value}
        onChange={val => { setFieldValue(field.name, val) }}

    >
        {({ country, impossible, onBlur, onInputChange, inputValue }) => {
            const FlagComponent = Flags[country || 'US']
            return (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 4fr',
                    alignItems: 'center'

                }}>
                    <div style={{
                        textAlign: 'center'
                    }}><FlagComponent width={47} style={{ borderRadius: '4px' }} /></div>
                    <div className="field-wrapper">
                        <input
                            name={field.name}
                            type="tel"
                            className="field"
                            value={inputValue}
                            onBlur={() => { onBlur(); setFieldTouched(field.name, true) }}
                            maxLength={35}
                            onChange={(e) => onInputChange(e.target.value)}
                        />
                        <FieldTitle name={field.name} customError={impossible && 'Invalid'}>{props.fieldTitle}</FieldTitle>
                    </div>
                </div>
            )
        }}
    </PhoneFormatter>
    )
}
