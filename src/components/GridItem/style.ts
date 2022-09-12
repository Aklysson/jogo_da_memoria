import styled from "styled-components";

type Props = {
    showBack: boolean
}

export const Container = styled.div<Props>`
background-color: ${props => props.showBack ? '#1550FF' : '#E2E2E3'};
border-radius: 20px;
display: flex;
justify-content: center;
cursor: pointer;
align-items: center;
`

type IProps = {
    opacity?: number
}

export const Icon = styled.img<IProps>`
width: 40px;
height: 40px;
opacity: ${props => props.opacity ?? 1};
`