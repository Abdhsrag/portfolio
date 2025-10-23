"use client";
import { useEffect, useRef } from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Dragon3D({ mousePosition, ...props }) {
  const group = useRef();
  const { scene, animations } = useGLTF("https://financial-orange-crocodile.myfilebase.com/ipfs/Qmf3s8VkdQ9kpfGjbFHkEBaZopdArig6p2iwjn1k6gYcgy");
  const { actions } = useAnimations(animations, group);
  
  // Load both sets of textures
  const textures1 = useTexture({
    map: '/models/textures/MI_M_B_44_Qishilong_body02_Inst_diffuse.png',
    normalMap: '/models/textures/MI_M_B_44_Qishilong_body02_Inst_normal.png',
  });
  
  const textures2 = useTexture({
    map: '/models/textures/MI_M_B_44_Qishilong_body02_2_Inst_diffuse.png',
    normalMap: '/models/textures/MI_M_B_44_Qishilong_body02_2_Inst_normal.png',
  });

  useEffect(() => {
    if (animations.length > 0 && actions) {
      const firstAnimation = Object.keys(actions)[0];
      actions[firstAnimation]?.play();
    }

    // Apply textures to the correct materials
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.material) {
          const materials = Array.isArray(child.material) 
            ? child.material 
            : [child.material];
          
          materials.forEach((material) => {
            // Match texture to material by name
            let textureSet = textures1;
            
            if (material.name.includes('body02_2_Inst')) {
              textureSet = textures2;
            } else if (material.name.includes('body02_Inst')) {
              textureSet = textures1;
            }
            
            // Apply the textures
            material.map = textureSet.map;
            material.normalMap = textureSet.normalMap;
            
            // Configure texture settings
            material.map.colorSpace = THREE.SRGBColorSpace;
            material.map.flipY = false;
            
            material.normalMap.colorSpace = THREE.NoColorSpace;
            material.normalMap.flipY = false;
            
            // Adjust material properties
            material.roughness = 0.7;
            material.metalness = 0.2;
            
            material.needsUpdate = true;
          });
        }
      }
    });

    // Center the model
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    
    scene.position.x = -center.x;
    scene.position.y = -center.y;
    scene.position.z = -center.z;
    
  }, [actions, animations, scene, textures1, textures2]);

  useFrame((state) => {
    if (group.current && mousePosition) {
      const baseY = props.position?.[1] || 0;
      group.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      group.current.rotation.y = mousePosition.x * 0.05;
      group.current.rotation.x = mousePosition.y * 0.03;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive
        object={scene}
        scale={props.scale || 2}
        rotation={[0, -Math.PI / 7, 0]}
      />
    </group>
  );
}

// Register the extension with useGLTF's loader
useGLTF.preload("https://financial-orange-crocodile.myfilebase.com/ipfs/Qmf3s8VkdQ9kpfGjbFHkEBaZopdArig6p2iwjn1k6gYcgy", (loader) => {
  loader.register((parser) => {
    // Import the extension class
    const { GLTFMaterialsPbrSpecularGlossinessExtension } = 
      require('three/examples/jsm/loaders/GLTFLoader');
    return new GLTFMaterialsPbrSpecularGlossinessExtension(parser);
  });
});