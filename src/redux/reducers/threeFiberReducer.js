import {SET_ACTIVE_OPTION, SET_INITIAL_MAP, SET_NEW_MATERIAL_OPT, SET_SELECTED_COLOR_OBJ} from "../types";


const initialState = {
    initialMap: [],
    activeOption: '',
    selectedColorObj: null,
    newMaterialOpt: {
        activeOption: '',
        newMTL: null
    }
}

export const ThreeFiberReducer = (state = initialState, action) => {
    const {type,payload} = action

    switch (type) {
        case SET_INITIAL_MAP:
            return {
                ...state,
                initialMap: payload
            }
        case SET_ACTIVE_OPTION:
            return {
                ...state,
                activeOption: payload
            }
        case SET_SELECTED_COLOR_OBJ:
            return {
                ...state,
                selectedColorObj: payload
            }
        case SET_NEW_MATERIAL_OPT:
            return {
                ...state,
                newMaterialOpt: payload
            }
        default:
            return state
    }
}