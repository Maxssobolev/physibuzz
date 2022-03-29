import React from 'react'
import { useField, useFormikContext } from "formik";
import { dadataToken } from '../../../apiConfig/dadata';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

export const DataSuggestionField = ({ ...props }) => {
    const { setFieldValue, setFieldTouched } = useFormikContext();
    const [field] = useField(props);
    return (
        <AddressSuggestions
            {...field}
            {...props}
            name={field.name}
            filterFromBound={props.filterFromBound}
            filterToBound={props.filterFromBound}
            value={field.value}
            onChange={val => {
                setFieldValue(field.name, val);
                setFieldTouched(field.name, true)
            }}
            filterLanguage='en'
            //если это поле выбора страны
            {...(props.firstAddressField ?
                {
                    filterLocations: [{
                        "country": "*",
                    }]
                } :
                {
                    filterLocations: [{
                        "country_iso_code": props.findIn,
                    }]
                }
            )}
            token={dadataToken}
            inputProps={{
                className: 'field field_select',
                autoComplete: "new-password",

                ...(props.findIn || props.firstAddressField ? { onBlur: () => setFieldTouched(field.name, true) } : { disabled: true, onBlur: () => { } })
            }}


        />
    )

}