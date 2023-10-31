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
    },[])



    /*======================================뱀게임======================================*/
    const [ key, setKey ] = useState("ArrowRight");
    const [ isLoad, setIsLoad ] = useState(false); // 게임 중 여부
    const [ snake, setSnake ] = useState([]); // 뱀게임 맵
    const [ snakeArr , setSnakeArr  ] = useState([]); //뱀 어레이
    const [ cnt , setCnt ] = useState(10); //뱀 꼬리 갯수
    useEffect(()=>{
        if(snake.length>0 && isLoad)snakeGameHandler()
    },[roadXY,isLoad])

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

        if(moveState == 1) {
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


    return (
        <>
            <div className="side_content side_box">
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
                    <button style={{marginLeft:'3rem'}} onClick={()=>{gameStart()}} ref={btnRef} >play</button>
                </div>
            </div>

        </>
    );
};

export default HiddenState;
