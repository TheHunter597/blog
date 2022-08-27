import HomePost from "./HomePost/HomePost";
import { useContext } from "react";
import styles from "./Header.module.scss";
import context from "../../context/context";
import { headerPosts } from "../../utilitis/types";

interface props {
  headerPosts: headerPosts[];
}

function Header(props: props) {
  let { headerPosts } = props;
  const result = headerPosts.map((entry) => {
    return (
      <div key={entry.slug}>
        <HomePost data={entry} />
      </div>
    );
  });

  return <div className={styles.Header}>{result}</div>;
}

export default Header;
