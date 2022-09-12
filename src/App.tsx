import { useEffect, useState } from 'react';
import * as C from './App.styles';
import Logo from './assets/devmemory_logo.png';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoArea';
import RestartIcon from './svgs/restart.svg'
import { ItemType } from './types/GridItemType';
import { items } from './data/item'
import { GridItem } from './components/GridItem';
import { formatTime } from './helpers/formatTime';

const App = () => {

  const [playing,setPlaying] = useState<boolean>(false)
  const [timeElapsed,setTimeElapsed] = useState<number>(0)
  const [moveCount,setMoveCount] = useState<number>(0)
  const [shownCount,setShownCount] = useState<number>(0)
  const [gridItem, setGridItem] = useState<ItemType[]>([])

  useEffect(() => { resetAndCreateGrid()} , [])


  useEffect(() => { 
    const timer = setInterval(() =>{ 
      if(playing){
    setTimeElapsed(timeElapsed + 1)
      }
  }, 1000)
  return () => clearInterval(timer)
    },[playing,timeElapsed]);
  const resetAndCreateGrid = () => {
// Resetar o jogo
setTimeElapsed(0)
setMoveCount(0)
setShownCount(0)
setGridItem([])
// Criar jogo
let tmpGrid:ItemType[] = []
for(let i = 0; i < (items.length * 2); i++) {
  tmpGrid.push({
    item: null,
    shown: false,
    permanentShown: false
  })
}

for(let w = 0; w < 2; w++){
  for(let i = 0; i < items.length ;i++){
    let pos = -1
    while(pos < 0 || tmpGrid[pos].item !== null){
      pos = Math.floor(Math.random() * (items.length * 2))
    }
    tmpGrid[pos].item= i
  } 
}

setGridItem(tmpGrid)

// Iniciar o jogo
setPlaying(true)

  }

const handleItemClick = (index:number) => {

}

  return(
  <C.Container>
    <C.Info>
      <C.LogoLink>
        <img src={Logo} width='200px' alt='Logo' />
      </C.LogoLink>
      <C.InfoArea>
        <InfoItem label='Count' value={formatTime(timeElapsed)} />
        <InfoItem label='Movimentos' value='0' />

      </C.InfoArea>
      <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}/>
    </C.Info>
    <C.GridArea>
      <C.Grid>
      {
        gridItem.map((item,index) => (
          <GridItem
          key={index}
          item={item}
          onClick={() => handleItemClick(index)}
          />
        ))
      }
      </C.Grid>
    </C.GridArea>
  </C.Container>
  )
}

export default App