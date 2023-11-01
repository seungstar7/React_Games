import React from 'react'
// import {Navigate, useNavigate} from 'react-router'
const GameMain = () => {

    // const navigate = useNavigate();
    const fnNavi = ( e ) => {
        console.log("wr")
        // navigate(`/game/${e.target.name}` )

    }
    return(
        <>
            <button name={"snake"} onClick={fnNavi}>snake</button>
            <button name={"matgo"} onClick={fnNavi}>matgo</button>
        </>
    )
}
export default GameMain;
