import HomePost from "./HomePost/HomePost";
import styles from "./Header.module.scss";
import { headerPosts } from "../../redux/generalInfo";

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
