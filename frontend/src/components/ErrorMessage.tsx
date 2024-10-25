interface Props {
    message: string
}

export default function ErrorMessage({ message }: Props) {
    return (
        <span className="text-destructive">
            {message}
        </span>
    )
}
