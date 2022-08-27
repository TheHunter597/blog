import Navbar from "./Navbar/Navbar";
import styles from "../styles/index.module.scss";
interface props {
  children: JSX.Element;
}

function Layout(props: props) {
  return (
    <div className={styles.root}>
      <Navbar />
      {props.children}
    </div>
  );
}

export default Layout;
