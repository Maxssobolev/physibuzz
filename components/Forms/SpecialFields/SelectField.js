import React from 'react'
import { useField, useFormikContext } from "formik";
import Select from 'react-select'
import { customSelectStyles } from '../../CommonUtils/CommonUtils';
import { DropdownIndicator } from '../../CommonUtils/DropdownIndicator';

export const SelectField = ({ ...props }) => {
    const { setFieldValue, setFieldTouched } = useFormikContext();
    const [field] = useField(props);
    return (<Select
        {...field}
        {...props}
        options={props.options}
        name={field.name}
        value={
            props.options ?
                props.defaultValue ?? props.options.find(option => option.value === field.value)
                :
                ''
        }
        styles={customSelectStyles}
        onChange={val => {
            setFieldValue(field.name, val);
        }
        }
        onBlur={() => setFieldTouched(field.name, true)}
        components={{ DropdownIndicator }}
        inputProps={{ autoComplete: 'random-string', autoFill: 'off' }}
    />)
}
