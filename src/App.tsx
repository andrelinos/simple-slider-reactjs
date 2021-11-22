import { Slider } from "./components/Slider";

import './styles/global.module.scss'
import styles from './styles.module.scss'

export function App(){
  return (
    <div className={styles.container}>
      <Slider />
    </div>
  )
}
