import { useFormikContext } from "formik";

/*
Возвращает стилизованный под ошибки тайтл поля
props: 
    name - название атрибута name предыдущего поля
*/
export const FieldTitle = ({ children, name, additionalLevel }) => {
    const { errors, touched } = useFormikContext();
    return (
        <span
            {...(
                errors[name] && touched[name] ?
                    {//                если это обьект
                        dataerrors: `${additionalLevel ? errors[name][additionalLevel] : errors[name]}`
                    } : {}
            )}
        >
            {children}
        </span>
    )
}
