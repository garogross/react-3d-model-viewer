import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import { useLoader} from "@react-three/fiber";
import {useRef, useEffect, useState} from "react";

import ringModel from "../../models/ring.gltf";
import lightEnvironment from '../../img/env2.hdr'


import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";
import {useDispatch, useSelector} from "react-redux";
import {setActiveOption, setInitialMap} from "../../redux/action/threeFiber";
import {RGBELoader} from "three-stdlib";

const initColor = (parent, type, mtl) => {
    parent.traverse(o => {
        if (o.isMesh && o.name.includes(type)) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.material = mtl;
            o.nameID = type;
            o.material.envMapIntensity = 10
        }
    });
}

const RingMesh = ({scene, isEnv}) => {
    const dispatch = useDispatch()
    const {initialMap, selectedColorObj, newMaterialOpt} = useSelector(state => state.threeFiber)


    const {scene: theModel} = useLoader(GLTFLoader, ringModel);
    // const theModel = useLoader(OBJLoader, ringObj);
    // const materials = useLoader(MTLLoader, bikeMtl);
    // const theModel = useLoader(OBJLoader, bike ,(loader) => {
    //     materials.preload();
    //     loader.setMaterials(materials);
    // });

    const ring = useRef(theModel)

    const [clientX, setClientX] = useState(0)
    const [clientY, setClientY] = useState(0)

    useEffect(() => {
        if (scene?.children) {
            let arr = []

            const flatSceneChildren = array => {
                array.forEach(item => {
                    if (item.children?.length) {
                        flatSceneChildren(item.children)
                    } else {
                        const itemParams = setMaterialParams(item)
                        arr.push(itemParams)
                    }
                })
            }
            flatSceneChildren(scene?.children[scene?.children.length - 1]?.children)

            dispatch(setInitialMap(arr))
        }
    }, [scene])

    const loader = new RGBELoader();

    useEffect(() => {
        loader.load(lightEnvironment, (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping
            scene.background = isEnv ? texture : null;
            scene.environment = texture
        })
    }, [isEnv])


    useEffect(() => {
        for (let key in selectedColorObj) {
            if (key === newMaterialOpt.activeOption) {
                setMaterial(newMaterialOpt.activeOption, newMaterialOpt.newMTL)
            } else {
                setMaterial(key, selectedColorObj[key])
            }
        }

    }, [newMaterialOpt.newMTL])

    useEffect(() => {
        if (theModel && initialMap) {
            for (let object of initialMap) {
                initColor(theModel, object.childID, object.mtl);
            }
        }
    }, [theModel, initialMap])

    const setMaterialParams = (item) => {
        return {
            childID: item['name'],
            mtl: new THREE.MeshStandardMaterial({
                color: parseInt("0x" + item['material']?.color.getHexString()),
                roughness: 0.1,
                metalness: 0.5,
                envMapIntensity: 5.0,
                map: item['material']?.map
            }),
            position: item.position
        }
    }

    const setMaterial = (type, mtl) => {
        theModel.traverse(o => {
            if (o.isMesh && o.nameID != null) {
                if (o.nameID === type) {
                    o.material = mtl;
                }
            }
        });
    }

    const onPointerDown = (e) => {
        setClientX(e.clientX)
        setClientY(e.clientY)
    }

    const onPointerUp = (e) => {
        e.stopPropagation()
        if (e.clientX === clientX && e.clientY === clientY) {
            dispatch(setActiveOption(e.object.name))
        }
    }

    return (
        <primitive
            ref={ring}
            object={theModel}
            scale={[2, 2, 2]}
            position={[0, 0, 0]}
            receiveShadow
            castShadow
            // onClick={onClick}
            // onPointerMove={onPointerMove}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
        >
        </primitive>
    )

}

export default RingMesh;
