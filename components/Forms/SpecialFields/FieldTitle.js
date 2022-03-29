import { useFormikContext } from "formik";

/*
Возвращает стилизованный под ошибки тайтл поля
props: 
    name - название атрибута name предыдущего поля
*/
export const FieldTitle = (props) => {
    const { errors, touched } = useFormikContext();
    return (
        <span
            {...(
                errors[props.name] && touched[props.name] ?
                    {//                если это обьект
                        dataerrors: `${props.additionalLevel ? errors[props.name][props.additionalLevel] : errors[props.name]}`
                    } : {}
            )}
        >
            {props.children}
        </span>
    )
}
