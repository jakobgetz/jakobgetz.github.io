import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content";
import styles from "./post.module.css";

// Generate Static Params for Next.js Static Export
export function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Simple Markdown Renderer for basic elements (to avoid large external libraries)
function renderMarkdown(content: string) {
  const lines = content.split("\n");
  let inCodeBlock = false;
  let codeBlockLanguage = "";
  let codeLines: string[] = [];
  let inList = false;
  
  return lines.map((line, idx) => {
    // 1. Handle Code Blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        inCodeBlock = false;
        const codeText = codeLines.join("\n");
        codeLines = [];
        return (
          <pre key={idx} className={styles.codeBlock} data-language={codeBlockLanguage}>
            <code>{codeText}</code>
          </pre>
        );
      } else {
        inCodeBlock = true;
        codeBlockLanguage = line.slice(3).trim();
        return null;
      }
    }
    
    if (inCodeBlock) {
      codeLines.push(line);
      return null;
    }
    
    // 2. Handle Headings
    if (line.startsWith("# ")) {
      return <h1 key={idx} className={styles.postH1}>{line.slice(2)}</h1>;
    }
    if (line.startsWith("## ")) {
      return <h2 key={idx} className={styles.postH2}>{line.slice(3)}</h2>;
    }
    if (line.startsWith("### ")) {
      return <h3 key={idx} className={styles.postH3}>{line.slice(4)}</h3>;
    }
    
    // 3. Handle Lists
    if (line.startsWith("- ")) {
      inList = true;
      // Parse inline formatting like bold or links inside list item
      return (
        <ul key={idx} className={styles.postUl}>
          <li>{parseInlineFormatting(line.slice(2))}</li>
        </ul>
      );
    }
    
    // 4. Empty Lines
    if (line.trim() === "") {
      inList = false;
      return <div key={idx} className={styles.spacer} />;
    }
    
    // 5. Paragraphs (Standard Text)
    return (
      <p key={idx} className={styles.postParagraph}>
        {parseInlineFormatting(line)}
      </p>
    );
  });
}

// Simple Inline Parser for Bold (**text**) and Links ([label](url))
function parseInlineFormatting(text: string) {
  // Simple regex parser
  const parts: React.ReactNode[] = [];
  let currentText = text;
  let keyIndex = 0;
  
  while (currentText.length > 0) {
    const boldMatch = currentText.match(/\*\*([\s\S]+?)\*\*/);
    const linkMatch = currentText.match(/\[([\s\S]+?)\]\(([\s\S]+?)\)/);
    const codeMatch = currentText.match(/`([\s\S]+?)`/);
    
    // Find whichever matches first
    const boldIdx = boldMatch?.index ?? Infinity;
    const linkIdx = linkMatch?.index ?? Infinity;
    const codeIdx = codeMatch?.index ?? Infinity;
    
    if (boldIdx === Infinity && linkIdx === Infinity && codeIdx === Infinity) {
      parts.push(currentText);
      break;
    }
    
    const minIdx = Math.min(boldIdx, linkIdx, codeIdx);
    
    if (minIdx > 0) {
      parts.push(currentText.substring(0, minIdx));
      currentText = currentText.substring(minIdx);
    }
    
    if (minIdx === boldIdx && boldMatch) {
      parts.push(<strong key={keyIndex++}>{boldMatch[1]}</strong>);
      currentText = currentText.substring(boldMatch[0].length);
    } else if (minIdx === linkIdx && linkMatch) {
      parts.push(
        <a key={keyIndex++} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
          {linkMatch[1]}
        </a>
      );
      currentText = currentText.substring(linkMatch[0].length);
    } else if (minIdx === codeIdx && codeMatch) {
      parts.push(<code key={keyIndex++} className={styles.inlineCode}>{codeMatch[1]}</code>);
      currentText = currentText.substring(codeMatch[0].length);
    }
  }
  
  return parts.length > 0 ? parts : text;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="content-container">
      <div className={styles.header}>
        <Link href="/blog" className={styles.backButton}>
          ← Back to Blog
        </Link>
        
        <div className={styles.meta}>
          <time className={styles.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className={styles.separator}>•</span>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.description}>{post.description}</p>
      </div>

      <div className={`${styles.body} card-glass`}>
        {renderMarkdown(post.content)}
      </div>
    </article>
  );
}
