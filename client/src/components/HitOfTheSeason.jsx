import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const ClothingModel = () => {
  const { scene } = useGLTF("/src/assets/gucci_shoes.glb?url");

  return <primitive object={scene} scale={0.8} position={[0, 0.8, 0]} />;
};

const HitOfTheSeason = () => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <h2
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "2.5rem", 
          fontWeight: "bold", 
          letterSpacing: "2px", 
          textTransform: "uppercase", 
          background: "linear-gradient(90deg, #ff7e5f, #feb47b)", 
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "2px 2px 10px rgba(255, 125, 50, 0.5)", 
        }}
      >
        🔥 Hit of the Season 🔥
      </h2>

      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <ClothingModel />
        </Suspense>
        <OrbitControls enableZoom={true} minDistance={3} maxDistance={12} />
      </Canvas>
    </div>
  );
};

export default HitOfTheSeason;
