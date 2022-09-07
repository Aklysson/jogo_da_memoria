import * as C from './App.styles';
import Logo from './assets/devmemory_logo.png';

const App = () => {
  return(
  <C.Container>
    <C.Info>
      <C.LogoLink>
        <img src={Logo} width='200px' alt='Logo' />;
      </C.LogoLink>
      <C.InfoArea>
        ...
      </C.InfoArea>
      <button>Reiniciar</button>
    </C.Info>
    <C.GridArea>
      ...
    </C.GridArea>
  </C.Container>
  )
}

export default App