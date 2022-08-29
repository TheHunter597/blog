import styles from "./Navbar.module.scss";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import context from "../../context/context";
import { actionTypes, contextType } from "../../utilitis/types";
import { FcSearch } from "react-icons/fc";
import { FaBars } from "react-icons/fa";
function Navbar() {
  const contextData = useContext(context) as contextType;
  const { state, dispatch, getCatPosts, signOut } = contextData;
  const input = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  useEffect(() => {
    getCatPosts();
  }, []);

  useEffect(() => {
    window.innerWidth < 1000
      ? dispatch({ type: actionTypes.CHANGE_PHONE_USER, value: true })
      : dispatch({ type: actionTypes.CHANGE_PHONE_USER, value: false });
    window.addEventListener("resize", () =>
      window.innerWidth < 1000
        ? dispatch({ type: actionTypes.CHANGE_PHONE_USER, value: true })
        : dispatch({ type: actionTypes.CHANGE_PHONE_USER, value: false })
    );
    return () => {
      window.removeEventListener("resize", () =>
        window.innerWidth < 1000
          ? dispatch({ type: actionTypes.CHANGE_PHONE_USER, value: true })
          : dispatch({ type: actionTypes.CHANGE_PHONE_USER, value: false })
      );
    };
  }, []);

  const dropdownContent = state.posts
    .filter((post) => {
      return searchTerm.length >= 2
        ? post.title.toLowerCase().includes(searchTerm.toLowerCase())
        : "";
    })
    .map((post) => {
      return (
        <li
          onClick={() => {
            setSearchTerm("");
            setActiveSearch(false);
          }}
          key={post.title}
        >
          <Link href={`/${post.categories[0].slug}/${post.slug}`}>
            <a>{post.title.slice(0, 15)}...</a>
          </Link>
        </li>
      );
    });

  const wideScreenNav = (
    <div className={styles.Navbar}>
      <div className={styles.Navbar__logo}>
        <Link href="/">
          <a>Variable</a>
        </Link>
      </div>
      <div className={styles.Navbar__headers}>
        <ul>
          {state.categories.categories.map((category) => (
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
      <div
        className={styles.Navbar__SignUp}
        onMouseEnter={() =>
          state.signedIn.isSignedIn ? setOpenUserMenu(true) : ""
        }
        onMouseLeave={() =>
          state.signedIn.isSignedIn ? setOpenUserMenu(false) : ""
        }
      >
        <ul>
          {!state.signedIn.isSignedIn ? (
            <li>
              <Link href="/sign">Sign Up</Link>
            </li>
          ) : (
            <>
              <li>
                <Link href="/">
                  <a>{state.signedIn.username}</a>
                </Link>
                {openUserMenu ? (
                  <ul className={styles.Navbar__userDropdown}>
                    <li>Fav list</li>
                    <li>Create post</li>
                    <li onClick={signOut}>Sign out</li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );

  const smallerScreenNav = (
    <div className={styles.Navbar}>
      <div className={styles.Navbar__logo}>
        <Link href="/">
          <a>Variable</a>
        </Link>
      </div>
      <div
        className={`${styles.Navbar__search} ${
          activeSearch ? styles.Navbar__search__active : ""
        }`}
        onClick={() => {
          setActiveSearch((prev) => !prev);
          setShowHeaders(false);
          setTimeout(() => {
            input.current?.focus();
          }, 100);
        }}
      >
        <FcSearch />
      </div>
      {activeSearch ? (
        <div className={styles.Navbar__dropdown}>
          <input
            disabled={!activeSearch}
            className={`${styles.Navbar__input} ${
              activeSearch ? styles.Navbar__input__active : ""
            }`}
            ref={input}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul>{dropdownContent}</ul>
        </div>
      ) : (
        ""
      )}
      <div
        className={`${styles.Navbar__bars} ${
          state.phoneUser ? styles.Navbar__bars__appear : ""
        } ${showHeaders ? styles.Navbar__bars__active : ""}`}
        onClick={() => {
          setShowHeaders((prev) => !prev);
          setActiveSearch(false);
        }}
      >
        <FaBars />
      </div>
      {showHeaders ? (
        <div className={styles.Navbar__headers}>
          <ul>
            <li onClick={() => setShowHeaders(false)}>
              {!state.signedIn.isSignedIn ? (
                <Link href="/sign">Sign Up</Link>
              ) : (
                <span>{state.signedIn.username}</span>
              )}
            </li>
            {state.categories.categories.map((category) => (
              <li key={category.slug} onClick={() => setShowHeaders(false)}>
                <Link href={`/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
            <li onClick={() => setShowHeaders(false)}>Favs list </li>
            <li onClick={() => setShowHeaders(false)}>Create post </li>
            <li
              onClick={() => {
                signOut;
                setShowHeaders(false);
              }}
            >
              Sign out
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );

  return !state.phoneUser ? wideScreenNav : smallerScreenNav;
}

export default Navbar;
