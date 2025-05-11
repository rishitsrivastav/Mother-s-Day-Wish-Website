import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei';
import { useRoute, useLocation } from 'wouter';
import { easing } from 'maath';
import getUuid from 'uuid-by-string';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark } from 'lucide-react';

const GOLDENRATIO = 1.61803398875;

interface GalleryPageProps {
  isVisible: boolean;
  onContinue: () => void;
}

const images = [
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: "/assets/1.jpg" },
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: "/assets/9.jpg" },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: "/assets/10.jpg" },
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: "/assets/4.jpg" },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: "/assets/back 1.jpg" },
  { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: "/assets/2.jpg" },
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: "/assets/7.jpg" },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: "/assets/8.jpg" },
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: "/assets/main.jpg" }
];

function Frame({ url, idx, c = new THREE.Color(), ...props }) {
  const image = useRef<THREE.Mesh>(null);
  const frame = useRef<THREE.Mesh>(null);
  const [, params] = useRoute('/item/:id');
  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const name = getUuid(url + (idx ?? ''));
  const isActive = params?.id === name;
  useCursor(hovered);
  
  useFrame((state, dt) => {
    const imageMaterial = image.current?.material as any;
    const frameMaterial = frame.current?.material as THREE.MeshBasicMaterial;
    
    if (imageMaterial) {
      imageMaterial.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
      easing.damp3(image.current!.scale, [
        0.85 * (!isActive && hovered ? 0.85 : 1),
        0.9 * (!isActive && hovered ? 0.905 : 1),
        1
      ], 0.1, dt);
    }
    
    if (frameMaterial) {
      easing.dampC(frameMaterial.color, hovered ? 'orange' : 'white', 0.1, dt);
    }
  });

  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
      </mesh>
      <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.025}>
        {name.split('-').join(' ')}
      </Text>
    </group>
  );
}

function Frames({ q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef<THREE.Group>(null);
  const clicked = useRef<THREE.Object3D | null>(null);
  const [, params] = useRoute('/item/:id');
  const [, setLocation] = useLocation();

  useEffect(() => {
    p.set(0, 0, 5.5);
    q.identity();
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    
    if (params?.id) {
      clicked.current = ref.current.getObjectByName(params.id);
      if (clicked.current) {
        clicked.current.parent?.updateWorldMatrix(true, true);
        clicked.current.parent?.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
        clicked.current.parent?.getWorldQuaternion(q);
      }
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  }, [params?.id, p, q]);

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  });

  return (
    <group
      ref={ref}
      onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
      onPointerMissed={() => setLocation('/')}>
      {images.map((props, idx) => <Frame key={props.url + idx} {...props} idx={idx} />)}
    </group>
  );
}

const GalleryPage: React.FC<GalleryPageProps> = ({ isVisible, onContinue }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#191920] overflow-hidden z-30"
        >
          <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 5.5], near: 0.1, far: 100 }}>
            <color attach="background" args={['#191920']} />
            <fog attach="fog" args={['#191920', 0, 15]} />
            <group position={[0, -0.5, 0]}>
              <Frames />
              <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <MeshReflectorMaterial
                  mirror={0.5}
                  blur={[300, 100]}
                  resolution={2048}
                  mixBlur={1}
                  mixStrength={80}
                  roughness={1}
                  depthScale={1.2}
                  minDepthThreshold={0.4}
                  maxDepthThreshold={1.4}
                  color="#050505"
                  metalness={0.5}
                />
              </mesh>
            </group>
            <Environment preset="city" />
          </Canvas>

          <motion.button
            onClick={onContinue}
            className="absolute bottom-8 right-8 flex items-center gap-2 px-8 py-4 
                     bg-white/10 backdrop-blur-sm text-white rounded-lg shadow-lg 
                     hover:bg-white/20 transition-all duration-300 group z-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-dancing text-xl">Continue to Your Special Poem</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryPage;