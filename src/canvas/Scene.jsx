import {useThree} from "@react-three/fiber";
import * as THREE from "three";
import {useEffect, Suspense} from "react";
import RingMesh from "./components/RingMesh";
import {OrbitControls} from "@react-three/drei";
import {useSelector} from "react-redux";

export const Scene = ({isEnv}) => {
    const {
        scene, camera,
        gl: {domElement, shadowMap}
    } = useThree();
    // Scene configuration;
    useEffect(() => {
        shadowMap.enabled = true;
    }, [])

    return (
        <>
            <OrbitControls args={[camera, domElement]} position={[1, 1, 1]}/>
            <ambientLight color={new THREE.Color(0xefefff)}/>
            <directionalLight
                name={'Dir. Light'}
                color={new THREE.Color(0xffffff)}
                intensity={0.54}
                position={[2, 2, 1]}
                castShadow
                shadow-camera-left={-2}
                shadow-camera-right={2}
                shadow-camera-top={2}
                shadow-camera-bottom={-2}
                shadow-camera-near={1}
                shadow-camera-far={8}
                shadow-mapSize-height={2048}
                shadow-mapSize-width={2048}
            />
            <Suspense fallback={null}>
                <RingMesh scene={scene} isEnv={isEnv}/>
            </Suspense>
        </>
    )
}