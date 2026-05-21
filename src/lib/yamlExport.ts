/**
 * YAML Export
 * - Generates a complete portfolio.config.yaml from parsed data
 * - Fills in sensible defaults for required fields
 * - Triggers browser download
 */

import type { ExtractedResumeData } from './resumeImporter';

export interface ConfigData extends ExtractedResumeData {
  avatarUrl?: string;
  resumeUrl?: string;
  resumeFileName?: string;
  openToWork?: boolean;
  defaultTheme?: string;
  colorPreset?: string;
  siteMode?: string;
  social?: Record<string, string>;
  sections?: { id: string; show: boolean }[];
  stats?: { label: string; value: number; prefix?: string; suffix?: string }[];
  languages?: { name: string; level: string }[];
  projects?: {
    name: string;
    description: string;
    tags: string[];
    liveUrl: string;
    repoUrl: string;
    featured: boolean;
  }[];
  publications?: {
    title: string;
    authors: string;
    venue: string;
    year: string;
    url: string;
    type: string;
    tags: string[];
  }[];
  testimonials?: {
    name: string;
    title: string;
    company: string;
    relationship: string;
    quote: string;
    photoUrl: string;
  }[];
  contactFormEndpoint?: string;
  contactHeading?: string;
  contactTitle?: string;
  contactDescription?: string;
  analyticsGoatcounterCode?: string;
}

/**
 * Generate a complete portfolio.config.yaml string from config data
 */
export function generateYaml(config: ConfigData): string {
  const escapeQuotes = (str: string | undefined): string => {
    if (!str) return '';
    return str.replace(/"/g, '\\"');
  };

  const formatString = (value: string | undefined): string => {
    if (!value) return "''";
    // Use simple quotes for values with special chars
    if (value.includes(':') || value.includes('#') || value.includes('"')) {
      return `"${escapeQuotes(value)}"`;
    }
    return `"${value}"`;
  };

  const requiredFields = {
    name: config.name || 'Your Name',
    title: config.title || 'Your Title',
    tagline: config.tagline || 'A brief professional summary',
    email: config.email || 'your.email@example.com',
    location: config.location || 'City, Country',
    avatarUrl:
      config.avatarUrl ||
      'https://avatars.githubusercontent.com/u/YOUR_GITHUB_ID?v=4',
    resumeUrl:
      config.resumeUrl ||
      'https://your-username.github.io/resume.pdf # Change when ready',
    resumeFileName: config.resumeFileName || 'resume.pdf',
  };

  let yaml = `# ============================================================
#  Portfolio Configuration — Edit this file to update your site
# ============================================================

# Required fields
name: ${formatString(requiredFields.name)}
title: ${formatString(requiredFields.title)}
tagline: ${formatString(requiredFields.tagline)}
email: ${formatString(requiredFields.email)}
${config.phone ? `phone: ${formatString(config.phone)}\n` : ''}location: ${formatString(requiredFields.location)}
avatarUrl: ${formatString(requiredFields.avatarUrl)}
resumeUrl: ${formatString(requiredFields.resumeUrl)}
resumeFileName: ${formatString(requiredFields.resumeFileName)}

# Deployment settings
openToWork: true
defaultTheme: system
colorPreset: indigo
siteMode: portfolio

# Social links (remove any you don't use)
social:
  github: "https://github.com"
  linkedin: "https://linkedin.com/in/username"
  twitter: "https://x.com"

# Portfolio sections to show
sections:
  - id: about
    show: true
  - id: skills
    show: ${config.skills && config.skills.length > 0 ? 'true' : 'false'}
  - id: experience
    show: ${config.experience && config.experience.length > 0 ? 'true' : 'false'}
  - id: education
    show: ${config.education && config.education.length > 0 ? 'true' : 'false'}
  - id: projects
    show: false
  - id: certifications
    show: ${config.certifications && config.certifications.length > 0 ? 'true' : 'false'}
  - id: publications
    show: false
  - id: testimonials
    show: false
  - id: contact
    show: true

# About section
about: ${formatString(config.about || 'Add your professional bio here.')}

# Skills (extracted from resume)
skills:
${
  config.skills && config.skills.length > 0
    ? config.skills
        .map(
          (skill) =>
            `  - category: ${formatString(skill.category)}
    items:
${skill.items.map((item) => `      - ${formatString(item)}`).join('\n')}`
        )
        .join('\n')
    : `  - category: Programming Languages
    items:
      - JavaScript
      - TypeScript
      - Python
  - category: Tools & Frameworks
    items:
      - React
      - Node.js
      - Vite`
}

# Experience (extracted from resume)
experience:
${
  config.experience && config.experience.length > 0
    ? config.experience
        .map(
          (exp) =>
            `  - company: ${formatString(exp.company)}
    role: ${formatString(exp.role)}
    period: ${formatString(exp.period)}
    description: ${formatString(exp.description)}
${exp.highlights ? `    highlights:\n${exp.highlights.map((h) => `      - ${formatString(h)}`).join('\n')}` : ''}`
        )
        .join('\n')
    : `  - company: Your Company
    role: Your Role
    period: "2020-2024"
    description: "Description of your work"
    highlights:
      - Highlight 1
      - Highlight 2`
}

# Education (extracted from resume)
education:
${
  config.education && config.education.length > 0
    ? config.education
        .map(
          (edu) =>
            `  - institution: ${formatString(edu.institution)}
    degree: ${formatString(edu.degree)}
    period: ${formatString(edu.period)}`
        )
        .join('\n')
    : `  - institution: University Name
    degree: Bachelor's Degree
    period: "2016-2020"`
}

# Certifications
certifications:
${
  config.certifications && config.certifications.length > 0
    ? config.certifications
        .map(
          (cert) =>
            `  - title: ${formatString(cert.title)}
    issuer: ${formatString(cert.issuer)}
    date: ${formatString(cert.date)}
    credentialUrl: ""
    badgeUrl: ""
    tags: []`
        )
        .join('\n')
    : `  # - title: Certification Name
    #   issuer: Issuer Name
    #   date: "2023-12"
    #   credentialUrl: ""
    #   badgeUrl: ""
    #   tags: []`
}

# Projects (optional)
projects: []

# Publications (optional)
publications: []

# Testimonials (optional)
testimonials: []

# Languages (optional)
languages: []

# Stats section (optional)
stats: []

# Additional settings
analytics:
  goatcounterCode: ""

blog:
  enabled: false
  title: Blog
  description: ""
`;

  return yaml;
}

/**
 * Trigger a file download in the browser
 */
export function downloadYaml(yamlContent: string, filename = 'portfolio.config.yaml'): void {
  const blob = new Blob([yamlContent], { type: 'text/yaml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
