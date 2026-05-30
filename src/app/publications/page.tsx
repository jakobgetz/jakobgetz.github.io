import { getPublications } from "@/lib/content";
import styles from "./publications.module.css";

export const metadata = {
  title: "Publications | Jakob Getz",
  description: "Academic publications, journals, and conference papers written by Jakob Getz.",
};

export default function Publications() {
  const publications = getPublications();

  return (
    <div className="content-container">
      <div className={styles.header}>
        <div className="badge">Research & Science</div>
        <h1 className={styles.title}>Publications</h1>
        <p className={styles.subtitle}>
          A list of peer-reviewed journal papers, conference proceedings, and active academic preprints I have authored or co-authored.
        </p>
      </div>

      <div className={styles.list}>
        {publications.length === 0 ? (
          <div className="card-glass">
            <p>No publications found. Check back later!</p>
          </div>
        ) : (
          publications.map((paper) => (
            <div key={paper.id} className="card-glass">
              <div className={styles.paperMeta}>
                <span className={styles.year}>{paper.year}</span>
                <span className={styles.venue}>{paper.venue}</span>
              </div>
              
              <h2 className={styles.paperTitle}>{paper.title}</h2>
              
              <div className={styles.authors}>
                {paper.authors.map((author, index) => {
                  const isJakob = author === "Jakob Getz";
                  return (
                    <span key={author}>
                      <span className={isJakob ? styles.authorSelf : styles.authorOther}>
                        {author}
                      </span>
                      {index < paper.authors.length - 1 ? ", " : ""}
                    </span>
                  );
                })}
              </div>
              
              <p className={styles.abstract}>
                <strong>Abstract:</strong> {paper.abstract}
              </p>
              
              <div className={styles.links}>
                <a
                  href={paper.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  View Publisher (DOI)
                </a>
                {paper.pdf && (
                  <a
                    href={paper.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Download PDF
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
