import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import Link from "next/link";
import styles from "./ContactSideBar.module.scss";
function ContactSideBar() {
  const contactsData = [
    {
      icon: <AiFillGithub />,
      url: "https://github.com/TheHunter597",
    },
    {
      icon: <AiFillLinkedin />,
      url: "https://www.linkedin.com/in/mohamed-hossam-3aaa8224b/",
    },
    {
      icon: <AiOutlineWhatsApp />,
      url: "https://wa.me/01229308595?text=urlencodedtext",
    },
    {
      icon: <SiGmail />,
      url: "https://mail.google.com/mail/u/0/?hl=en&tf=cm&fs=1&to=thehunter597777@gmail.com",
    },
  ];
  const result = contactsData.map((contact) => {
    return (
      <button key={contact.url}>
        {" "}
        <Link href={contact.url}>
          <a target="_blank" rel="noreferrer ">
            {contact.icon}
          </a>
        </Link>
      </button>
    );
  });
  return <div className={styles["ContactSideBar"]}>{result}</div>;
}

export default ContactSideBar;
