import {COLORS} from "../../constants/colors";
import {selectSwatch} from "../../redux/action/threeFiber";
import {useDispatch} from "react-redux";

const ColorsSlider = () => {
    const dispatch = useDispatch()

    const onColorChange = e => {
        dispatch(selectSwatch(e))
    }

    return (
        <div id="js-tray" className="tray" >
            <div
                id="js-tray-slide"
                className="tray__slide"
            >
                {COLORS.map((color, idx) => (
                    <div
                        key={idx}
                        className="tray__swatch"
                        style={{background: color.texture ?
                                `url(${color.texture})` :
                                `#${color.color}`}}
                        data-key={idx}
                        onClick={onColorChange}
                    />
                ))}
            </div>
        </div>
    )
}

export default ColorsSlider;
