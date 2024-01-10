import './style.css';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import {
  ContactShadows,
  Environment,
  Float,
  Html,
  PresentationControls,
  useGLTF,
} from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export default function Experience() {
  const params = {
    scaleMax: 1.5,
    scaleMin: 0.8,
  };

  const options = useControls({
    debug: { value: false },
    colorBackground: {
      value: '#fcfad9',
    },
    colorScreen: {
      value: '#4fe1e3',
    },
  });

  const laptop = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
  );

  const { viewport } = useThree();

  return (
    <>
      {options.debug && <Perf position='top-left' />}

      <Environment preset='city' />

      <color attach='background' args={[options.colorBackground]} />

      <ContactShadows
        position={[0, -1.4, 0]}
        scale={5 * 1.5}
        blur={2.4}
        opacity={0.4}
      />

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
              <iframe src='https://odyssey4165.vercel.app/' />
            </Html>
          </primitive>
        </Float>
      </PresentationControls>
    </>
  );
}
