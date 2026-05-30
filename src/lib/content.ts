import fs from "fs";
import path from "path";

// Define Interfaces
export interface Profile {
  name: string;
  title: string;
  avatar: string;
  bio: string;
  socials: {
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  featured: boolean;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  doi: string;
  pdf?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
}

// Content directory paths
const CONTENT_DIR = path.join(process.cwd(), "src", "content");

// Simple front-matter parser to avoid external dependencies
function parseFrontmatter(fileContent: string) {
  const match = fileContent.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {} as Record<string, string>, content: fileContent };
  }
  
  const yamlBlock = match[1];
  const content = match[2];
  const data: Record<string, any> = {};
  
  yamlBlock.split("\n").forEach((line) => {
    const parts = line.split(":");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const value = parts.slice(1).join(":").trim().replace(/^['"]|['"]$/g, "");
      
      // Parse lists (e.g. tag1, tag2)
      if (value.includes(",")) {
        data[key] = value.split(",").map((v) => v.trim());
      } else {
        data[key] = value;
      }
    }
  });
  
  return { data, content };
}

// Fetch Profile
export function getProfile(): Profile {
  const filePath = path.join(CONTENT_DIR, "profile.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData) as Profile;
}

// Fetch Projects
export function getProjects(): Project[] {
  const filePath = path.join(CONTENT_DIR, "projects.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData) as Project[];
}

// Fetch Publications
export function getPublications(): Publication[] {
  const filePath = path.join(CONTENT_DIR, "publications.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const publications = JSON.parse(rawData) as Publication[];
  return publications.sort((a, b) => b.year - a.year);
}

// Fetch Blog Posts
export function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(CONTENT_DIR, "blog");
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  
  const files = fs.readdirSync(blogDir);
  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const filePath = path.join(blogDir, file);
      const rawContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = parseFrontmatter(rawContent);
      
      return {
        slug,
        title: data.title || "Untitled Post",
        date: data.date || "",
        description: data.description || "",
        tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
        content,
      };
    });
  
  // Sort posts by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Fetch Single Blog Post
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const blogDir = path.join(CONTENT_DIR, "blog");
  const filePath = path.join(blogDir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(rawContent);
  
  return {
    slug,
    title: data.title || "Untitled Post",
    date: data.date || "",
    description: data.description || "",
    tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
    content,
  };
}
