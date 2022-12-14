import * as C from './styles'

type Props = {
    label: string,
    icon: any,
    onClick: React.MouseEventHandler<HTMLDivElement>
}

export function Button({label,icon,onClick}: Props) {
    return (
        <C.Container onClick={onClick}>
            <C.IconArea>
                <C.Icon src={icon}/>
                <C.Label>{label}</C.Label>
            </C.IconArea>

        </C.Container>
    )
}