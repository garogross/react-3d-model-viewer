import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setActiveOption} from "../../redux/action/threeFiber";

const OptionsMenu = () => {
    const dispatch = useDispatch()
    const {initialMap,activeOption} = useSelector(state => state.threeFiber)

    const optionNames = initialMap.map(item => item.childID)
    const optionNamesFiltered = new Set(optionNames)

    const onClickOption = (item) => {
        dispatch(setActiveOption(item))
    }

    return(
        <div className="options">
            {optionNamesFiltered && [...optionNamesFiltered].map((item, idx) => (
                <div
                    className={`option ${activeOption === item ? "--is-active" : ""}`}
                    data-option={item}
                    onClick={() => onClickOption(item)}
                    key={idx}
                >
                    <p>{item}</p>
                    {/*Detal {idx + 1}*/}
                </div>
            ))}
        </div>
    )
}

export default OptionsMenu