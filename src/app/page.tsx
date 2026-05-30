import Link from "next/link";
import { getProfile, getProjects, getBlogPosts } from "@/lib/content";
import styles from "./page.module.css";

export default function Home() {
  const profile = getProfile();
  
  // Filter featured projects
  const featuredProjects = getProjects().filter((project) => project.featured);
  
  // Get recent 2 blog posts
  const recentPosts = getBlogPosts().slice(0, 2);

  return (
    <div className="content-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className={styles.heroLayout}>
          <div className={styles.heroText}>
            <div className="badge">Available for opportunities</div>
            <h1 className={styles.heroGreeting}>
              Hi, I'm <span className={styles.accentText}>{profile.name}</span>
            </h1>
            <h2 className={styles.heroSubtitle}>{profile.title}</h2>
            <p className={styles.heroBio}>{profile.bio}</p>
            
            <div className={styles.heroActions}>
              <a href="#projects" className="btn-primary">
                View My Projects
              </a>
              <Link href="/blog" className="btn-secondary">
                Read My Blog
              </Link>
            </div>
          </div>
          
          <div className={styles.avatarContainer}>
            {/* Elegant glassmorphic gradient avatar placeholder */}
            <div className={styles.avatarFrame}>
              <div className={styles.avatarGradient}>
                <span className={styles.avatarInitials}>JG</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className="section-title">Featured Projects</h2>
          <Link href="/projects" className={styles.sectionLink}>
            All Projects →
          </Link>
        </div>
        <div className="grid-cols-2">
          {featuredProjects.map((project) => (
            <div key={project.id} className="card-glass">
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <div className={styles.projectTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.projectTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.projectLinks}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  GitHub
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Blog Posts Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className="section-title">Recent Writing</h2>
          <Link href="/blog" className={styles.sectionLink}>
            All Posts →
          </Link>
        </div>
        <div className={styles.postsList}>
          {recentPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.postCard}>
              <div className={styles.postMeta}>
                <time className={styles.postDate}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <div className={styles.postTags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.postTagMini}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postExcerpt}>{post.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
