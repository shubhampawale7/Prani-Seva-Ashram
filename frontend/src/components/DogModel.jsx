// components/DogModel.jsx
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";

const Dog = () => {
  const { scene } = useGLTF("/frontend/public/dog/scene.gltf"); // Put your dog model in public/dog/scene.gltf
  return <primitive object={scene} scale={0.5} />;
};

const DogModel = () => {
  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [0, 1, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Dog />
          </Stage>
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default DogModel;
