import CustomArrow from '../../assets/img/arrow-down.svg'
import { components } from 'react-select';

export const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                {props.selectProps.menuIsOpen ? <CustomArrow width={10} style={{ transform: 'rotate(180deg)' }} /> : <CustomArrow width={10} />}
            </components.DropdownIndicator>
        )
    );
}