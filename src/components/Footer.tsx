import { getProfile } from "@/lib/content";
import styles from "./Footer.module.css";

export default function Footer() {
  const profile = getProfile();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerContainer} content-container`}>
        <div className={styles.left}>
          <p className={styles.copyright}>
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className={styles.subtitle}>
            Built with Next.js, TypeScript & CSS Modules.
          </p>
        </div>
        
        <div className={styles.socials}>
          {profile.socials.github && (
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              GitHub
            </a>
          )}
          {profile.socials.linkedin && (
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              LinkedIn
            </a>
          )}
          {profile.socials.twitter && (
            <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              Twitter
            </a>
          )}
          {profile.socials.email && (
            <a href={profile.socials.email} className={styles.socialLink}>
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
