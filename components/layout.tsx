import Navbar from "./Navbar/Navbar";
import styles from "../styles/index.module.scss";

import { ContextProvider } from "../context/context";
interface props {
  children: JSX.Element;
}

function Layout(props: props) {
  return (
    <ContextProvider>
      <div className={styles.root}>
        <Navbar />
        <div className={styles.container}>{props.children}</div>
      </div>
    </ContextProvider>
  );
}

export default Layout;
