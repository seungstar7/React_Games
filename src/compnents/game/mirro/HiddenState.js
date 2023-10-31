import React, {useEffect, useRef, useState} from 'react';

const HiddenState = () => {
    const [img , setImg] = useState("");


    /*===================================================================================================================*/

    const [ mirro, setMirro ] = useState([]); // 미로게임 맵
    const [ roadXY, setRoadXY ] = useState([]); // 캐릭터 좌표

    const [creatable , setCreatable] = useState(false);
    const btnRef = useRef();

    useEffect(()=>{
        // if(!hidden){
        //     alert("잘못된 접근입니다")
        //     navi("/system-manage")
        //     return;
        // }
        // mirroMapRender();
        snakeMapRender();
        createDeck();
    },[])



    /*======================================뱀게임======================================*/
    const [ key, setKey ] = useState("ArrowRight");
    const [ isLoad, setIsLoad ] = useState(false); // 게임 중 여부
    const [ snake, setSnake ] = useState([]); // 뱀게임 맵
    const [ snakeArr , setSnakeArr  ] = useState([]); //뱀 어레이
    const [ cnt , setCnt ] = useState(10); //뱀 꼬리 갯수
    useEffect(()=>{
        if(snake.length>0 && isLoad)snakeGameHandler()
    },[snake,isLoad])

    const gameStart = () =>{
        setIsLoad(true);
        document.addEventListener('keydown',(evt) => moveControl(evt))
    }

    const snakeMapRender = () => {
        let tmpArr = [];
        let mapSize = 20; // 맵크기 20*20
        for(let i = 0; i < mapSize; i++){
            let row = []
            for(let j = 0; j < mapSize; j++){
                if(i==0 || j==0 || i ==mapSize-1 || j==mapSize-1)row.push(1)
                else row.push(0)
            }
            tmpArr.push(row);
        }
        let newItem = getItem();
        tmpArr[newItem[0]][newItem[1]] = 3;
        setSnakeArr([])
        setSnake(tmpArr);
        setKey("ArrowRight");
        setRoadXY([2,2])
    }
    const snakeGameHandler = () =>{
        setTimeout(()=>{
            switch (key){
                case 'ArrowUp' :
                    snakeMovement(roadXY[0]-1,roadXY[1])
                    break;
                case 'ArrowDown' :
                    snakeMovement(roadXY[0]+1,roadXY[1])
                    break;
                case 'ArrowRight' :
                    snakeMovement(roadXY[0],roadXY[1]+1)
                    break;
                case 'ArrowLeft' :
                    snakeMovement(roadXY[0],roadXY[1]-1)
                    break;
            }
            // exChange2(roadXY[0],roadXY[1],roadXY[0],roadXY[1]+1)
        },100)
    }

    const getItem = () => {
        let n = Math.floor(Math.random()*16)+ 3;
        let n2 = Math.floor(Math.random()*16) + 3;

        return [n,n2];
    }
    const snakeMovement = ( x2 , y2) =>{
        let tmp = [...snake];
        let moveState = tmp[x2][y2]
        if(moveState == 1 || moveState == 2 ) {
            setIsLoad(false);
            alert("game over")
            getItem()
            snakeMapRender()
            return;
        };
        if(moveState == 3) {
            setCnt(cnt+1);
            setCreatable(true);
        }
        if(Math.floor(Math.random()*10)==5 && creatable){
            let newItem = getItem();
            setCreatable(false);
            tmp[newItem[0]][newItem[1]] = 3;
        }
        tmp[x2][y2] = 2;
        let xy = [x2,y2];
        let tmpSnake = snakeArr;
        let length = tmpSnake.push(xy);
        if(length == cnt){
            let dl = tmpSnake.shift();
            tmp[dl[0]][dl[1]] = 0;
        }
        setSnakeArr(tmpSnake)
        setSnake([...snake]);
        setRoadXY(xy);
    }

    const moveControl = ( event ) =>{

        event.preventDefault();
        let eKey = event.key;
        //방향키 역류 방지
        setKey(eKey)
        // console.log(eKey + "이벤트키")
        // console.log(key + "걍키")
        // switch (key){
        //     case 'ArrowUp' :
        //         if(eKey!=="ArrowDown")setKey(eKey);
        //         break;
        //     case 'ArrowDown' :
        //         if(eKey!=="ArrowUp")setKey(eKey);
        //         break;
        //     case 'ArrowRight' :
        //         if(eKey!=="ArrowLeft")setKey(eKey);
        //         break;
        //     case 'ArrowLeft' :
        //         if(eKey!=="ArrowRight")setKey(eKey);
        //         break;
        // }
    }


    /*======================================미로찾기 게임======================================*/
    const mirroMapRender = () =>{
        let tmp = [[0,1,0,1,0],[0,0,1,0,0],[0,0,2,0,0],[0,0,0,0,0],[0,0,0,0,0]]
        setMirro(tmp);
    }
    const move = (event) =>{
        let key = event.key;
        let tmp = [...mirro];
        // console.log(mirro)
        switch (key){
            case 'ArrowUp' :
                if(roadXY[0]==0)return;
                exChange(roadXY[0],roadXY[1],roadXY[0]-1,roadXY[1])
                break;
            case 'ArrowDown' :
                if(roadXY[0]==4)return;
                exChange(roadXY[0],roadXY[1],roadXY[0]+1,roadXY[1])
                break;
            case 'ArrowRight' :
                exChange(roadXY[0],roadXY[1],roadXY[0],roadXY[1]+1)
                break;
            case 'ArrowLeft' :
                exChange(roadXY[0],roadXY[1],roadXY[0],roadXY[1]-1)
                break;
        }
    }

    const exChange = ( x1 , y1 , x2 , y2 ) =>{
        let tmp = [...mirro];
        if(tmp[x2][y2]==1)return;
        tmp[x1][y1] = 0;
        tmp[x2][y2] = 2;
        let xy = [x2,y2];
        setMirro([...mirro]);
        setRoadXY(xy);
        if(x2==4 && y2==4)alert("성ㄱ동")
    }

    /*======================================맞고======================================*/
    const [ deck , setDeck ] = useState([]);
    const [ myCard , setMyCard ] = useState({});
    const [ tableCard , setTableCard ] = useState({});
    const [ isStart , setIsStart ] = useState(false);
    const [ pickCard , setPickCard ] = useState([]);

    const createDeck = () =>{
        let tmpDeck = [];
        for(let i = 0; i < 12; i++){
            let row = []
            for(let j = 0; j < 4; j++){
                row.push(j)
            }
            tmpDeck.push(row);
        }
        // for(let i = 0; i < 42; i++){
        //     tmpDeck.push(i);
        // }
        setDeck(tmpDeck);
    }
    useEffect(()=>{
        if(deck.length>0 && !isStart)shuffle();
    },[deck])

    const shuffle = () =>{
        let tmpCard = [] //테이블 카드
        let tmpMyCard = [] // 내 카드
        let tmpDeck = [...deck]
        let tableObj = {};
        let myCardObj = {};
        while (true){
            if(tmpCard.length==8)break;
            let random1 = Math.floor(Math.random()*11);
            let random2 = Math.floor(Math.random()*3);
            if(tmpDeck[random1][random2]==null)continue
            tmpDeck[random1][random2] = null;
            tmpCard.push({[random1]:[random1,random2]})
            if(!tableObj[random1])tableObj[random1] = [random2]
            else tableObj[random1] = [...tableObj[random1],random2]
        }
        while (true){
            if(tmpMyCard.length==12)break;
            let random1 = Math.floor(Math.random()*11);
            let random2 = Math.floor(Math.random()*3);
            if(tmpDeck[random1][random2]==null)continue
            tmpDeck[random1][random2] = null;
            tmpMyCard.push([random1,random2])
            if(!myCardObj[random1])myCardObj[random1] = [random2]
            else myCardObj[random1] = [...myCardObj[random1],random2]
        }
        console.log(tableObj);
        console.log(myCardObj);
        setIsStart(true);
        console.log(tableObj.length)

        setTableCard(tableObj)
        setMyCard(myCardObj);
        setDeck([...tmpDeck]);
    }

    const hittable = ( num ) =>{
        for(let i = num; i < 4; i++){
            console.log()
            console.log(tableCard.includes(num+i))
            if(tableCard.includes(num+i))return false;
        }
        return true;
    }
    
    const hitCard = ( selectedIdx, selectedCard ) =>{
        console.log(selectedIdx + "인덱스")
        console.log(selectedCard + "카드")
        let wo = tableCard
        console.log(wo[selectedIdx])
        wo[selectedIdx].shift();
        console.log(wo[selectedIdx])
        delete wo[selectedIdx]
        console.log({...wo})
        setTableCard({...wo})

    }
    useEffect(()=>{
        console.log(tableCard)
    },[tableCard])


    return (
        <>
            <div className="side_content side_box">
                <div className="cndtn_box">
                    <div>
                        <select className="select" name='division1' >
                            <option value={1}>{('기간별')}</option>
                            <option value={2}>{('일자 상세')}</option>
                            <option value={3}>{('의사별')}</option>
                            {/*<option value={4}>{t('의사 일자 상세')}</option>*/}
                        </select>
                    </div>
                    <div>
                        <select className="select">
                            <option>조회기간</option>
                        </select>
                    </div>
                </div>
                <table>
                    <tbody>
                    {/*{mirro.map((item, index)=>{*/}
                    {/*    return(*/}
                    {/*        <tr key={index}>*/}
                    {/*            {item.map((row, idx)=>(*/}
                    {/*                <td key={idx}>{row}</td>*/}
                    {/*            ))}*/}
                    {/*        </tr>*/}
                    {/*    )*/}
                    {/*})}*/}
                    </tbody>
                </table>
                <br/>
                <table>
                    <tbody>
                    {snake.map((item, index)=>{
                        return(
                            <tr key={index}>
                                {item.map((row, idx)=>(
                                    <td key={idx}>{row == 0 ? "○" : row == 2 ? "●" : "■"}</td>
                                ))}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <div>
                    {/*<input onKeyDown={event => move(event)}/>*/}
                    <button style={{marginLeft:'3rem'}} onClick={()=>{gameStart()}} ref={btnRef} >play</button>
                </div>
                <div>
                    {/*{deck.map((item, idx)=>{*/}
                    {/*    return(*/}
                    {/*        <>*/}
                    {/*            <p>{idx+1} : {item.map((it,idx2)=>(<span>{it}, </span>))}</p>*/}
                    {/*            <br/>*/}
                    {/*        </>*/}
                    {/*    )*/}
                    {/*})}*/}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    {/*{tableCard.map((item, idx)=>{*/}
                    {/*    return(*/}
                    {/*        <>*/}
                    {/*            <p>{idx+1} : {item.map((it,idx2)=>(<span>{it}, </span>))}</p>*/}
                    {/*            <br/>*/}
                    {/*        </>*/}
                    {/*    )*/}
                    {/*})}*/}
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        { tableCard[0] && tableCard[0].map((item)=>(<span>  1 : {item} || </span>))} ★
                        { tableCard[1] && tableCard[1].map((item)=>(<span>  2 : {item} || </span>))} ★
                        { tableCard[2] && tableCard[2].map((item)=>(<span>  3 : {item} || </span>))} ★
                        { tableCard[3] && tableCard[3].map((item)=>(<span>  4 : {item} || </span>))} ★
                        { tableCard[4] && tableCard[4].map((item)=>(<span>  5 : {item} || </span>))} ★
                        { tableCard[5] && tableCard[5].map((item)=>(<span>  6 : {item} || </span>))} ★
                        { tableCard[6] && tableCard[6].map((item)=>(<span>  7 : {item} || </span>))} ★
                        { tableCard[7] && tableCard[7].map((item)=>(<span>  8 : {item} || </span>))} ★
                        { tableCard[8] && tableCard[8].map((item)=>(<span>  9 : {item} || </span>))} ★
                        { tableCard[9] && tableCard[9].map((item)=>(<span>  10 : {item} ||  </span>))} ★
                        { tableCard[10] && tableCard[10].map((item)=>(<span> 11 : {item} ||  </span>))} ★
                        { tableCard[11] && tableCard[11].map((item)=>(<span> 12 : {item} ||  </span>))} ★
                    </div>
                    <br/>
                    <br/>
                    <div>
                        { myCard[0] && myCard[0].map((item)=> {
                            return(
                                <>
                                    {tableCard[0] ? <button onClick={()=>hitCard(0,item)}>  {tableCard[0] && "☞"}1 : {item} || </button> : <span> 1 : {item} || </span>}
                                </>
                            )
                        })}
                        { myCard[1] && myCard[1].map((item)=> {
                            return(
                                <>
                                    {tableCard[1] ? <button onClick={()=>hitCard(1,item)}>  {tableCard[1] && "☞"}2 : {item} || </button> : <span> 2 : {item} || </span>}
                                </>
                            )
                        })}
                        { myCard[2] && myCard[2].map((item)=> {
                            return(
                                <>
                                    {tableCard[2] ? <button onClick={()=>hitCard(2,item)}>  {tableCard[2] && "☞"}3 : {item} || </button> : <span> 3 : {item} || </span>}
                                </>
                            )
                        })}
                        { myCard[3] && myCard[3].map((item)=> {
                            return(
                                <>
                                    {tableCard[3] ? <button onClick={()=>hitCard(3,item)}>  {tableCard[3] && "☞"}4 : {item} || </button> : <span> 4 : {item} || </span>}
                                </>
                            )
                        })}
                        { myCard[4] && myCard[4].map((item)=> {
                            return(
                                <>
                                    {tableCard[4] ? <button onClick={()=>hitCard(4,item)}>  {tableCard[4] && "☞"}5 : {item} || </button> : <span> 5 : {item} || </span>}
                                </>
                            )
                        })}
                        { myCard[5] && myCard[5].map((item)=> {
                            return(
                                <>
                                    {tableCard[5] ? <button onClick={()=>hitCard(5,item)}>  {tableCard[5] && "☞"}6 : {item} || </button> : <span> 6 : {item} || </span>}
                                </>
                            )
                        })}
                        { myCard[6] && myCard[6].map((item)=> {
                            return(
                                <>
                                    {tableCard[6] ? <button onClick={()=>hitCard(6,item)}>  {tableCard[6] && "☞"}7 : {item} || </button> : <span> 7 : {item} || </span>}
                                </>
                            )
                        })}
                        { myCard[7] && myCard[7].map((item)=> {
                            return(
                                <>
                                    {tableCard[7] ? <button onClick={()=>hitCard(7,item)}>  {tableCard[7] && "☞"}8 : {item} || </button> : <span> 8 : {item} || </span>}
                                </>
                            )
                        })}
                        { myCard[8] && myCard[8].map((item)=> {
                            return(
                                <>
                                    {tableCard[8] ? <button onClick={()=>hitCard(8,item)}>  {tableCard[8] && "☞"}9 : {item} || </button> : <span> 9 : {item} || </span>}
                                </>
                            )
                        })}
                        { myCard[9] && myCard[9].map((item)=> {
                            return(
                                <>
                                    {tableCard[9] ? <button onClick={()=>hitCard(9,item)}>  {tableCard[9] && "☞"}10 : {item} || </button> : <span> 10 : {item} || </span>}
                                </>
                            )
                        })}
                        { myCard[10] && myCard[10].map((item)=> {
                            return(
                                <>
                                    {tableCard[10] ? <button onClick={()=>hitCard(10,item)}>  {tableCard[10] && "☞"}11 : {item} || </button> : <span> 11 : {item} || </span>}
                                </>
                            )
                        })}
                        { myCard[11] && myCard[11].map((item)=> {
                            return(
                                <>
                                    {tableCard[11] ? <button onClick={()=>hitCard(11,item)}>  {tableCard[11] && "☞"}12 : {item} || </button> : <span> 12 : {item} || </span>}
                                </>
                            )
                        })}
                    </div>
                    {/*{myCard.map((item, idx)=>{*/}
                    {/*    return(*/}
                    {/*        <>*/}
                    {/*            <p>{idx+1} : {item.map((it,idx2)=>(<span>{it}, </span>))}</p>*/}
                    {/*            <br/>*/}
                    {/*        </>*/}
                    {/*    )*/}
                    {/*})}*/}
                </div>
                <div>

                    <p>히든스테이트입니다</p>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>
                    <p>fileServlet</p>
                    <input type={'file'} onChange={fileServlet}/>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                <div>
                    {/*<img src={ img ? `${host}api/v1/sample/fileTest?fileName=${img}` : ""}/>*/}
                </div>
                <div>
                    <p>fileFtp</p>
                    <input type={'file'} onChange={fileFtp}/>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>

                <div>
                    {/*<img src={ img ? `${host}api/v1/sample/fileTest?fileName=${img}` : ""}/>*/}
                </div>
                <div>
                    <button onClick={tester}>apitest</button>
                </div>

            </div>

        </>
    );
};

export default HiddenState;
