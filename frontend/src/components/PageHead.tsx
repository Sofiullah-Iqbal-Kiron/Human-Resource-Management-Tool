interface Props {
    title: string
}

export default function PageHead({ title }: Props) {
    return (
        <section>
            <h1 className="text-2xl text-center py-2.5">{title}</h1>
        </section>
    )
}
