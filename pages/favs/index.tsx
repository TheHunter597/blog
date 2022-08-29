import styles from "./favs.module.scss";
import context from "../../context/context";
import { contextType, headerPosts } from "../../utilitis/types";
import { useContext } from "react";
import HomePost from "../../components/Home/HomePost/HomePost";

function Favs() {
  const contextData = useContext(context) as contextType;
  const { state } = contextData;
  return (
    <div className={styles.Favs}>
      <h3>Your Favourite List</h3>
      <div>
        <div>mango</div>
        <div>mango</div>
        <div>mango</div>
      </div>
    </div>
  );
}

export default Favs;
