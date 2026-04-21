import { Link } from "react-router-dom";
import hero1x from "../../assets/images/hero-image.jpg";
import hero2x from "../../assets/images/hero-image@2x.jpg";
import { GoArrowUpRight } from "react-icons/go";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        The road to the <span className={styles.textAccent}>depths</span> of the human soul
                    </h1>

                    <p className={styles.text}>
                        We help you to reveal your potential, overcome challenges and find a guide in your own life
                        with the help of our experienced psychologists.
                    </p>
                    <Link to="/psychologists">
                        <button type="button" className={styles.button}>
                            Get started<GoArrowUpRight size={20} />
                        </button>
                    </Link>
                </div>

                <div className={styles.imgWrap}>
                    <img
                        src={hero1x}
                        srcSet={`${hero1x} 1x, ${hero2x} 2x`}
                        alt="Psychologist consultation"
                        className={styles.image}
                        loading="eager"
                        decoding="async"
                    />

                    <div className={styles.questionDecor}><span>?</span></div>

                    <div className={styles.usersDecor}>
                        <span className={styles.usersIcon}><svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_1_75)">
                                <path d="M14.2705 16.994L13.8427 18.5907L2.66622 15.5959L3.09404 13.9993C3.09404 13.9993 3.94968 10.806 9.53793 12.3034C15.1262 13.8007 14.2705 16.994 14.2705 16.994ZM13.5086 8.66129C13.6566 8.10866 13.6375 7.52454 13.4536 6.98278C13.2697 6.44102 12.9293 5.96596 12.4754 5.61768C12.0215 5.26939 11.4745 5.06352 10.9036 5.0261C10.3327 4.98869 9.76356 5.1214 9.26809 5.40746C8.77262 5.69352 8.3731 6.12008 8.12006 6.6332C7.86702 7.14632 7.77181 7.72295 7.84649 8.29018C7.92117 8.8574 8.16237 9.38975 8.53959 9.81989C8.91682 10.25 9.41313 10.5587 9.96575 10.7067C10.7068 10.9053 11.4964 10.8013 12.1608 10.4178C12.8252 10.0342 13.31 9.40234 13.5086 8.66129ZM15.0783 13.7879C15.4673 14.2992 15.7395 14.8895 15.8758 15.5174C16.0121 16.1452 16.0092 16.7953 15.8672 17.4219L15.4394 19.0185L18.6327 19.8741L19.0605 18.2775C19.0605 18.2775 19.837 15.3796 15.0783 13.7879ZM16.2531 6.40194C15.7044 6.25164 15.1229 6.27193 14.5861 6.4601C14.8895 7.2676 14.9325 8.1498 14.7093 8.98302C14.486 9.81624 14.0076 10.5587 13.3411 11.1063C13.712 11.5377 14.2054 11.846 14.7557 11.9902C15.4967 12.1888 16.2863 12.0848 16.9507 11.7012C17.6151 11.3176 18.0999 10.6858 18.2985 9.94475C18.4971 9.2037 18.3931 8.41412 18.0095 7.74972C17.6259 7.08531 16.9941 6.6005 16.2531 6.40194Z" fill="#FBFBFB" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_75">
                                    <rect width="19.8356" height="19.8356" fill="white" transform="translate(5.13385) rotate(15)" />
                                </clipPath>
                            </defs>
                        </svg></span>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIconBox}>
                            <span className={styles.statIcon}>✓</span>
                        </div>

                        <div className={styles.statContent}>
                            <p className={styles.statLabel}>Experienced psychologists</p>
                            <p className={styles.statValue}>15,000</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}