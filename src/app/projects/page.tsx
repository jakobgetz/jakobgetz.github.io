import { getProjects } from "@/lib/content";
import styles from "./projects.module.css";

export const metadata = {
  title: "Projects | Jakob Getz",
  description: "A showcase of open source coding projects, tools, and technical experiments.",
};

export default function Projects() {
  const projects = getProjects();

  return (
    <div className="content-container">
      <div className={styles.header}>
        <div className="badge">Code & Systems</div>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>
          A curated collection of my software projects, tooling systems, experiments, and active contributions.
        </p>
      </div>

      <div className={`${styles.grid} grid-cols-2`}>
        {projects.length === 0 ? (
          <div className="card-glass">
            <p>No projects found. Check back later!</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="card-glass">
              <div className={styles.projectHeader}>
                <div className={styles.titleRow}>
                  <h2 className={styles.projectTitle}>{project.title}</h2>
                  {project.featured && (
                    <span className={styles.featuredBadge}>Featured</span>
                  )}
                </div>
                
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className={styles.description}>{project.description}</p>
              
              <div className={styles.links}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  GitHub Repository
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Launch App
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
