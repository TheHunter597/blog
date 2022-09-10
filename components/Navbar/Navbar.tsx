import styles from "./Navbar.module.scss";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { FaBars } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootDispatch } from "../../redux";
import {
  generalInfoData,
  fetchAllPosts,
  fetchAllCategories,
  changePhoneUser,
} from "../../redux/generalInfo";
import { useRouter } from "next/router";
import { signedInData } from "../../redux/signedIn";
import {
  changeSignedInUsername,
  changeSignedInEmail,
  changeIsSignedIn,
  changeSignedInFavs,
} from "../../redux/signedIn";
function Navbar() {
  const input = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const reduxDispatch: RootDispatch = useDispatch();
  const generalInfo = useSelector(generalInfoData);
  const signedInState = useSelector(signedInData);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("SignedIn") == "true") {
      reduxDispatch(changeIsSignedIn(true));
      reduxDispatch(changeSignedInUsername(localStorage.getItem("Username")));
      reduxDispatch(changeSignedInEmail(localStorage.getItem("Email")));
      reduxDispatch(
        changeSignedInFavs(
          JSON.parse(localStorage.getItem("favs") as string) === null
            ? []
            : JSON.parse(localStorage.getItem("favs") as string)
        )
      );
    }
  }, [signedInState.isSignedIn, reduxDispatch]);
  function signOut() {
    localStorage.removeItem("SignedIn");
    localStorage.removeItem("Username");
    localStorage.removeItem("Email");
    localStorage.removeItem("favs");

    setTimeout(() => {
      location.reload();
      router.push("/");
    }, 500);
  }

  useEffect(() => {
    reduxDispatch(fetchAllPosts());
    reduxDispatch(fetchAllCategories());
    window.innerWidth < 1000
      ? reduxDispatch(changePhoneUser(true))
      : reduxDispatch(changePhoneUser(false));
    window.addEventListener("resize", () =>
      window.innerWidth < 1000
        ? reduxDispatch(changePhoneUser(true))
        : reduxDispatch(changePhoneUser(false))
    );
    return () => {
      window.removeEventListener("resize", () =>
        window.innerWidth < 1000
          ? reduxDispatch(changePhoneUser(true))
          : reduxDispatch(changePhoneUser(false))
      );
    };
  }, [reduxDispatch]);

  const dropdownContent = generalInfo.posts
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
            <a>{post.title.slice(0, 20)}...</a>
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
          {generalInfo.categories.categories.map((category) => (
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
          signedInState.isSignedIn ? setOpenUserMenu(true) : ""
        }
        onMouseLeave={() =>
          signedInState.isSignedIn ? setOpenUserMenu(false) : ""
        }
      >
        <ul>
          {!signedInState.isSignedIn ? (
            <li>
              <Link href="/sign">Sign Up</Link>
            </li>
          ) : (
            <>
              <li>
                <Link href="/">
                  <a>{signedInState.username}</a>
                </Link>
                {openUserMenu ? (
                  <ul className={styles.Navbar__userDropdown}>
                    <li>
                      <Link href="/favs">Favs list</Link>
                    </li>
                    <li
                      onClick={() => {
                        window.alert(
                          "Only admin can create posts keep tuned for new updates :)"
                        );
                      }}
                    >
                      Create post
                    </li>
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
          generalInfo.phoneUser ? styles.Navbar__bars__appear : ""
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
              {!signedInState.isSignedIn ? (
                <Link href="/sign">Sign Up</Link>
              ) : (
                <span>{signedInState.username}</span>
              )}
            </li>
            {generalInfo.categories.categories.map((category) => (
              <li key={category.slug} onClick={() => setShowHeaders(false)}>
                <Link href={`/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
            {signedInState.isSignedIn ? (
              <>
                <li onClick={() => setShowHeaders(false)}>
                  <Link href="/favs">Favs list</Link>{" "}
                </li>
                <li onClick={() => setShowHeaders(false)}>Create post </li>
                <li
                  onClick={() => {
                    signOut();
                    setShowHeaders(false);
                  }}
                >
                  Sign out
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );

  return !generalInfo.phoneUser ? wideScreenNav : smallerScreenNav;
}

export default Navbar;
