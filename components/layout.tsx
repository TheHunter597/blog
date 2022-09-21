import Navbar from "./Navbar/Navbar";
import styles from "../styles/index.module.scss";
interface props {
  children: JSX.Element;
}

function Layout(props: props) {
  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.container}>{props.children}</div>
    </div>
  );
}

export default Layout;
