import './style.css';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import * as THREE from 'three';
import {
  CameraControls,
  ContactShadows,
  Environment,
  Float,
  Html,
  PresentationControls,
  Text3D,
  useGLTF,
  useMatcapTexture,
} from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

export default function Experience() {
  // Parameters
  const params = {
    scaleMax: 1.5,
    scaleMin: 0.8,
    scaleTexMax: 1,
    scaleTexMin: 0.5,
    material: new THREE.MeshMatcapMaterial(),
  };

  // Leva options
  const options = useControls({
    debug: { value: false },
    colorBackground: {
      value: '#fcfad9',
    },
    colorScreen: {
      value: '#4fe1e3',
    },
  });

  // Load laptop model
  const laptop = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
  );

  // Get viewport access
  const { viewport } = useThree();

  // Use texture with updating
  const [matcapTexture] = useMatcapTexture('394641_B1A67E_75BEBE_7D7256', 256);

  useEffect(() => {
    params.material.matcap = matcapTexture;
    params.material.needsUpdate = true;

    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;

    // Initial camera animation on page load
    intro();
  }, [matcapTexture, params.material]);

  // Camera controls access
  const controls = useRef();

  // GSAP animation timeline (laptop animation)
  const timeline = gsap.timeline();

  useMemo(() => {
    return (
      gsap.set(laptop.nodes.FrontCameraRing001.position, {
        x: 0,
        y: 0,
        z: 0,
      }),
      laptop.nodes.Top.children.forEach((child) => {
        if (child.name === 'AppleLogo000') {
          gsap.set(child.position, {
            x: 0,
            y: 2,
            z: 0.39,
          });
          gsap.set(child.rotation, {
            x: -1.32,
            y: 0,
            z: 0,
          });
          timeline
            .to(child.position, {
              x: 0,
              y: -0.12,
              z: -2,
              delay: -2,
            })
            .to(
              child.rotation,
              {
                x: 0,
                duration: 0.5,
              },
              '<0.2'
            );
        } else {
          gsap.set(child.rotation, {
            x: 1.822,
          });
          timeline
            .to(
              child.rotation,
              2,
              {
                x: 0,
                duration: 1,
                ease: 'power1.out',
                onComplete: () => {
                  document.querySelector('.iframe').style.opacity = 1;
                },
              },
              2
            )
            .to(
              child.position,
              {
                x: 0,
                y: 0,
                z: 0,
              },
              0
            );
        }
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initial camera animation on page load
  const intro = async () => {
    await controls.current.dolly(-22);
    controls.current.smoothTime = 1;
    await controls.current.dolly(22, true);
  };

  // Text options
  const textOptions = {
    material: params.material,
    font: './font/Roboto_Regular.json',
    width: 2,
    height: 0.2,
    size: 0.75,
    scale: viewport.aspect > 1 ? params.scaleTexMax : params.scaleTexMin,
    lineHeight: 0.6,
    bevelEnabled: true,
    bevelOffset: 0,
    bevelSegments: 5,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    curveSegments: 12,
    position: [
      viewport.aspect > 1 ? -4 : -1.5,
      viewport.aspect > 1 ? 3.6 : 2,
      -4,
    ],
    textAlign: 'center',
  };

  // Stop initial camera animation when page size is changed
  useEffect(() => {
    window.addEventListener('resize', () => {
      controls.current._enabled = false;
    });
  }, []);

  return (
    <>
      {options.debug && <Perf position='top-left' />}

      <Environment preset='city' />

      <color attach='background' args={[options.colorBackground]} />

      <ContactShadows
        position={[0, -1.4, 0]}
        scale={5 * params.scaleMax}
        blur={2.4}
        opacity={0.4}
      />

      <CameraControls
        ref={controls}
        minPolarAngle={1}
        maxPolarAngle={1.5}
        minAzimuthAngle={-0.6}
        maxAzimuthAngle={1}
        onEnd={(e) => {
          e.target._enabled = false;
        }}
        makeDefault
      />

      <fog attach='fog' args={['#171720', 10, 20]} />

      <PresentationControls
        global
        rotation={[0.13, 0.4, 0]}
        polar={[-0.2, 0.2]}
        azimuth={[-1, 1]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.3}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            color={options.colorScreen}
            intensity={65}
            position={[0, 0.55, -1.15]}
            rotation={[0.1, Math.PI, 0]}
          />
          <primitive
            object={laptop.scene}
            position={[0, -1.2, 0]}
            scale={viewport.aspect > 1 ? params.scaleMax : params.scaleMin}
          >
            <Html
              transform
              wrapperClass='html-screen'
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe
                className='iframe'
                src='https://odyssey4165.vercel.app/'
              />
            </Html>
          </primitive>

          <Text3D {...textOptions}>Space Odyssey [4165]</Text3D>
        </Float>
      </PresentationControls>
    </>
  );
}
