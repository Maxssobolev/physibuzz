export default function Search(props) {
    const { customClasses, placeholder, update, data, term, searchField, customStyle } = props

    function dataSearch(e) {
        const value = e.target.value.toLowerCase();

        const filter = data.filter(row => {
            return row[searchField].toLowerCase().includes(value);
        });


        update({
            data: filter,
            term: value
        });
    };
    return (

        <input
            value={term}
            type="text"
            placeholder={placeholder}
            className={`input input_search ${customClasses || ''}`}
            style={customStyle || {}}
            onChange={function (e) { dataSearch(e) }}
        />

    )
}


