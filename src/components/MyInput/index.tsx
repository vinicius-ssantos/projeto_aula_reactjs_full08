import './index.scss'
type Props = {
    id: string,
    label: string,
    value?: string,
    type?: React.HTMLInputTypeAttribute | undefined,
    change: (value: string) => void
}

export default function MyInput(props: Props) {
    return (
        <div className="my-input">
            <label htmlFor={props.id}>{props.label}:</label>
            <input
                id={props.id}
                value={props.value}
                onChange={event => props.change(event.target.value)}
                type={props.type === undefined ? "text" : props.type}
            />
        </div>
    )
}