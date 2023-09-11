export default function Operand({id, number}) {
    return (
        <button className="operand" id={id}>{number}</button>
    )
}