import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
    display: flex;
    padding: 50px 0;
`

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;
`

export const LogoLink = styled.a`

`

export const InfoArea = styled.div`

`

export const GridArea = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`

export const Grid = styled.div`
width: 430px;
display: grid;
grid-template-columns: repeat(4,1fr);
gap: 10px;
`