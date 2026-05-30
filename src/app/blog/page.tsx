import Link from "next/link";
import { getBlogPosts } from "@/lib/content";
import styles from "./blog.module.css";

export const metadata = {
  title: "Blog | Jakob Getz",
  description: "Writing and thoughts on distributed systems, compilers, and web technology.",
};

export default function Blog() {
  const posts = getBlogPosts();

  return (
    <div className="content-container">
      <div className={styles.header}>
        <div className="badge">Writing & Ideas</div>
        <h1 className={styles.title}>The Blog</h1>
        <p className={styles.subtitle}>
          Thought pieces, tutorials, and insights about software engineering, distributed systems, and modern web development.
        </p>
      </div>

      <div className={styles.list}>
        {posts.length === 0 ? (
          <div className="card-glass">
            <p>No blog posts found. Check back later!</p>
          </div>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className={styles.postCard}>
              <div className={styles.postMeta}>
                <time className={styles.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <Link href={`/blog/${post.slug}`} className={styles.postTitleLink}>
                <h2 className={styles.postTitle}>{post.title}</h2>
              </Link>
              
              <p className={styles.postDescription}>{post.description}</p>
              
              <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                Read Article →
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
