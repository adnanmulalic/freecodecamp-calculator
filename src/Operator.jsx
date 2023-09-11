export default function Operator({id, operation}) {
    return (
        <button className="operator" id={id}>{operation}</button>
    )
}