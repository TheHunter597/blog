import Navbar from "./Navbar/Navbar";
import styles from "../styles/index.module.scss";
import { Provider } from "react-redux";
import store from "../redux";
interface props {
  children: JSX.Element;
}

function Layout(props: props) {
  return (
    <Provider store={store}>
      <div className={styles.root}>
        <Navbar />
        <div className={styles.container}>{props.children}</div>
      </div>
    </Provider>
  );
}

export default Layout;
