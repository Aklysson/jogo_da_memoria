import { useEffect, useState } from "react";
import * as C from "./App.styles";
import Logo from "./assets/devmemory_logo.png";
import { Button } from "./components/Button";
import { InfoItem } from "./components/InfoArea";
import RestartIcon from "./svgs/restart.svg";
import { ItemType } from "./types/GridItemType";
import { items } from "./data/item";
import { GridItem } from "./components/GridItem";
import { formatTime } from "./helpers/formatTime";

const App = () => {
    //Logica do Jogo
  const [playing, setPlaying] = useState<boolean>(false);
    // Logica do Tempo do Jogo
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
    // Logica dos Movimentos do Jogo
  const [moveCount, setMoveCount] = useState<number>(0);
    // Logica das Cartas
  const [shownCount, setShownCount] = useState<number>(0);
    // Logica do GridItem
  const [gridItem, setGridItem] = useState<ItemType[]>([]);

    // Uso do UseEffect
  useEffect(() => {
    resetAndCreateGrid();
  }, []);
    //Tempo do Jogo

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

    // Verify if opened are equal
  useEffect(() => {
    if(shownCount === 2) {      
      let opened = gridItem.filter(item => item.shown);
      if(opened.length === 2) {
        if(opened[0].item === opened[1].item) {
      // v1 if both are equal, make every "shon" permanent
          let gridClone = [...gridItem];          
          for(let i in gridClone) {
            if(gridClone[i].shown) {
              gridClone[i].permanentShown = true;
              gridClone[i].shown = false;
            }            
          }
          setGridItem(gridClone);
          setShownCount(0);
        } else {
          setTimeout(() => {
            let gridClone = [...gridItem];          
            for(let i in gridClone) {            
              gridClone[i].shown = false;
            }
            setGridItem(gridClone);
            setShownCount(0);
          }, 1000);          
        }
      }

      setMoveCount(moveCount + 1);
    }
  }, [gridItem, shownCount]);

    // verufy if game Over

    useEffect(() =>{
      if(moveCount > 0 && gridItem.every(item => item.permanentShown === true)){
        setPlaying(false);
      }
  
    }, [moveCount, gridItem]);


  const resetAndCreateGrid = () => {
    // Resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);
    // Criar jogo
    let tmpGrid: ItemType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
      });
    }
    // Preencher o Grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }

    setGridItem(tmpGrid);

    // Iniciar o jogo
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItem];
      if ( tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false ) {
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItem(tmpGrid);
    }
  };
  return (
    <C.Container>
      <C.Info>
        <C.LogoLink>
          <img src={Logo} width="200px" alt="Logo" />
        </C.LogoLink>
        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTime(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount} />
        </C.InfoArea>
        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
         { playing ? 
         gridItem.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          )) : 
          
             <h1>Well Done!</h1>
          }
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
