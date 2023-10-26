import './App.css';
import {useEffect, useState} from "react";
import {Canvas} from "@react-three/fiber";

import OptionsMenu from "./components/OptionsMenu/OptionsMenu";
import ColorsSlider from "./components/ColorsSlider/ColorsSlider";
import {Scene} from "./canvas/Scene";
import {useDispatch, useSelector} from "react-redux";
import {selectSwatch, setNewMaterialOpt, setSelectedColorObj} from "./redux/action/threeFiber";

function App() {

    const dispatch = useDispatch()
    const {initialMap, activeOption} = useSelector(state => state.threeFiber)
    const [isEnv,setIsEnv] = useState(true)


    useEffect(() => {
        if (initialMap.length) {
            let obj = {}
            initialMap.forEach(item => {
                obj[item.childID] = item.mtl
            })
            dispatch(setSelectedColorObj(obj))
        }
    }, [initialMap])


    useEffect(() => {
        if (activeOption) {
            dispatch(selectSwatch())
        } else {
            dispatch(setNewMaterialOpt({
                activeOption,
                newMTL: null
            }))
        }
    }, [activeOption])

    return (
        <>
            <OptionsMenu/>
            <Canvas id="rtfCanvas">
                <Scene isEnv={isEnv}/>
            </Canvas>
            <div className="controls">
                <div className="info">
                    <div className="info__message">
                        <p>
                            <strong>&nbsp;Grab&nbsp;</strong> to rotate ring.{" "}
                            <strong>&nbsp;Scroll&nbsp;</strong> to zoom.{" "}
                            <strong>&nbsp;Drag&nbsp;</strong> swatches to view more.
                        </p>
                    </div>
                </div>
                <button onClick={() => setIsEnv(prevState => !prevState)}>environment {isEnv ? 'off' : 'on' }</button>
                <ColorsSlider/>
            </div>
        </>
    );
}

export default App;
