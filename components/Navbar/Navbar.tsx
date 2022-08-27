import styles from "./Navbar.module.scss";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import context from "../../context/context";
import { contextType } from "../../utilitis/types";
import { FcSearch } from "react-icons/fc";
function Navbar() {
  const contextData = useContext(context) as contextType;
  const { state, dispatch } = contextData;
  const input = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const categories = state.categories.categories.map((category) => {
    return { name: category.name, slug: category.slug };
  });

  const dropdownContent = state.posts
    .filter((post) => {
      return post.title.includes(searchTerm);
    })
    .map((post) => {
      return (
        <li
          onClick={() => {
            setSearchTerm("");
            setActiveSearch(false);
          }}
        >
          <Link href={`/${post.categories[0].slug}/${post.slug}`}>
            <a>{post.title.slice(0, 15)}...</a>
          </Link>
        </li>
      );
    });

  return (
    <div className={styles.Navbar}>
      <div className={styles.Navbar__logo}>
        <Link href="/">
          <a>Variable</a>
        </Link>
      </div>
      <div className={styles.Navbar__headers}>
        <ul>
          {categories.map((category) => (
            <li key={category.name}>
              <Link href={`/${category.slug}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.Navbar__searchInput}>
        <div
          className={`${styles.Navbar__search} ${
            activeSearch ? styles.Navbar__search__active : ""
          }`}
          onClick={() => {
            setActiveSearch((prev) => !prev);
            setTimeout(() => {
              input.current?.focus();
            }, 100);
          }}
        >
          <FcSearch />
        </div>
        <input
          disabled={!activeSearch}
          className={`${styles.Navbar__input} ${
            activeSearch ? styles.Navbar__input__active : ""
          }`}
          ref={input}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {activeSearch && searchTerm.length > 1 ? (
          <ul className={styles.Navbar__dropdown}>{dropdownContent}</ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Navbar;
