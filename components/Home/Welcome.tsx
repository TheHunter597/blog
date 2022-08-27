import styles from "./Welcome.module.scss";

function Welcome() {
  return (
    <div className={styles.Welcome}>
      <h1>Welcome to variable blog</h1>
      <h3>
        Here I provide some posts about functions and programmtic patterns I
        found through out my way of learning
      </h3>
    </div>
  );
}

export default Welcome;
