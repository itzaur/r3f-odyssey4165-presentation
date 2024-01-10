import { Perf } from 'r3f-perf';
import './style.css';
import { useControls } from 'leva';
import { OrbitControls } from '@react-three/drei';

export default function Experience() {
  const options = useControls({
    debug: { value: false },
    colorBackground: {
      value: '#fcfad9',
    },
  });

  return (
    <>
      {options.debug && <Perf position='top-left' />}

      <OrbitControls makeDefault />

      <color attach='background' args={[options.colorBackground]} />

      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
}
