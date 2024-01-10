import { Perf } from 'r3f-perf';
import './style.css';
import { useControls } from 'leva';
import {
  ContactShadows,
  Environment,
  Float,
  PresentationControls,
  useGLTF,
} from '@react-three/drei';

export default function Experience() {
  const options = useControls({
    debug: { value: false },
    colorBackground: {
      value: '#fcfad9',
    },
  });

  const laptop = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
  );

  return (
    <>
      {options.debug && <Perf position='top-left' />}

      <Environment preset='city' />

      <color attach='background' args={[options.colorBackground]} />

      <ContactShadows
        position={[0, -1.4, 0]}
        scale={5}
        blur={2.4}
        opacity={0.4}
      />

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.2, 0.2]}
        azimuth={[-1, 1]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.3}>
          <primitive object={laptop.scene} position={[0, -1.2, 0]} />
        </Float>
      </PresentationControls>
    </>
  );
}
