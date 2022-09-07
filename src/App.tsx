import * as C from './App.styles';
import Logo from './assets/devmemory_logo.png';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoArea';
import RestartIcon from './svgs/restart.svg'

const App = () => {

  const resetAndCreateGrid = () => {

  }

  return(
  <C.Container>
    <C.Info>
      <C.LogoLink>
        <img src={Logo} width='200px' alt='Logo' />
      </C.LogoLink>
      <C.InfoArea>
        <InfoItem label='Count' value='00:00' />
        <InfoItem label='Movimentos' value='0' />

      </C.InfoArea>
      <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}/>
    </C.Info>
    <C.GridArea>
      ...
    </C.GridArea>
  </C.Container>
  )
}

export default App