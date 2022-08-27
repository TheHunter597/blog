import styles from "./Navbar.module.scss";
import logo from "../../public/images/logo_transparent.png";
import Image from "next/image";
import Link from "next/link";
function Navbar() {
  const categories = [
    {
      name: "JavaScript",
      slug: "javascript",
    },
    {
      name: "TypeScript",
      slug: "typescript",
    },
    {
      name: "SCSS",
      slug: "scss",
    },
    {
      name: "React",
      slug: "react",
    },
    {
      name: "GraphCMS",
      slug: "graph-cms",
    },
  ];

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
    </div>
  );
}

export default Navbar;
