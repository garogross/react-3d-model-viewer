import {SET_ACTIVE_OPTION, SET_INITIAL_MAP, SET_NEW_MATERIAL_OPT, SET_SELECTED_COLOR_OBJ} from "../types";
import {COLORS} from "../../constants/colors";
import * as THREE from "three";
import nx from "../../img/textures/cube/nx.jpg"
import pz from "../../img/textures/cube/pz.jpg"
import ny from "../../img/textures/cube/ny.jpg"
import py from "../../img/textures/cube/py.jpg"
import px from "../../img/textures/cube/px.jpg"
import nz from "../../img/textures/cube/nz.jpg"


const textures = [nx,pz,ny,py,px,nz]

export const setInitialMap = (payload) => dispatch => {
    dispatch({type: SET_INITIAL_MAP, payload})
}

export const setActiveOption = (payload) => (dispatch, getState) => {
    const {activeOption} = getState().threeFiber
    if (activeOption === payload) {
        dispatch({type: SET_ACTIVE_OPTION, payload: ''})
    } else {
        dispatch({type: SET_ACTIVE_OPTION, payload})
    }
}

export const setSelectedColorObj = (payload) => dispatch => {
    dispatch({type: SET_SELECTED_COLOR_OBJ, payload})
}

export const setNewMaterialOpt = (payload) => dispatch => {
    dispatch({type: SET_NEW_MATERIAL_OPT, payload})
}


export const selectSwatch = (e) => (dispatch,getState) => {
    const {selectedColorObj,activeOption} = getState().threeFiber
    let newMTL;
    if (e) {
        let color = COLORS[parseInt(e.target.dataset.key)];
        let reflectionCube = new THREE.CubeTextureLoader().load(textures);
        reflectionCube.format = THREE.RGBAFormat;
        if (color.texture) {
            let txt = new THREE.TextureLoader().load(color.texture);

            txt.repeat.set(color.size[0], color.size[1], color.size[2]);
            txt.wrapS = THREE.RepeatWrapping;
            txt.wrapT = THREE.RepeatWrapping;

            newMTL = new THREE.MeshStandardMaterial({
                map: txt,
                emissiveIntensity: 0.6,
                // envMap: !color.withoutEnvMap ?  reflectionCube : null,
                envMapIntensity: 2,
                metalness:  0.6,
                roughness: 0.2,
            });
        } else {
            newMTL = new THREE.MeshStandardMaterial({
                color: parseInt("0x" + color.color),
                // emissive: new THREE.Color( '0x' + color.color ),
                emissiveIntensity: 0.6,
                envMap: reflectionCube,
                envMapIntensity: 2,
                metalness: 0.8,
                roughness: 0.2,
                opacity: color.opacity || 1,
                transparent: !!(color.opacity)
            });

        }
        dispatch(setSelectedColorObj({
            ...selectedColorObj,
            [activeOption]: newMTL
        }))
    } else {
        newMTL = new THREE.MeshStandardMaterial({
            color: parseInt("0x" + '0dd700'),
        });
    }

    dispatch(setNewMaterialOpt({
        activeOption,
        newMTL
    }));
};