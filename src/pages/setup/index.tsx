import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Check,
  Copy,
  CheckCircle,
  ChevronRight,
  Sparkles,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';
import bundledChangelog from '../../../CHANGELOG.md?raw';
import { StepImport, type StepImportProps } from './StepImport';
import type { ExtractedResumeData } from '@/lib/resumeImporter';

const GITHUB_TEMPLATE_URL =
  'https://github.com/git-vitae/git-vitae.github.io/generate';
const GITHUB_SIGNUP_URL = 'https://github.com/signup';
const GITHUB_PAGES_DOCS = 'https://docs.github.com/en/pages';

// ─── Copy button ─────────────────────────────────────────────────────────────

function InlineCopy({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handle}
      className="bg-secondary border-border text-muted-foreground hover:text-foreground hover:border-primary/40 ml-1 inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-xs transition-all"
    >
      {copied ? (
        <CheckCircle size={11} className="text-green-500" />
      ) : (
        <Copy size={11} />
      )}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

// ─── Step 0: Welcome ─────────────────────────────────────────────────────────

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center">
      <div className="mb-6 text-5xl">👋</div>
      <h2 className="text-foreground mb-4 font-serif text-2xl font-medium sm:text-3xl">
        Let's set up your free portfolio
      </h2>
      <p className="text-muted-foreground mx-auto mb-8 max-w-md text-sm leading-relaxed">
        This takes about <strong className="text-foreground">5 minutes</strong>.
        We'll walk you through each step with clear pictures so you always know
        exactly where to click.
      </p>

      <div className="mx-auto mb-10 grid max-w-xl gap-4 text-left sm:grid-cols-3">
        {[
          {
            emoji: '🆓',
            label: 'Completely free',
            sub: 'No credit card, no trial',
          },
          {
            emoji: '🖱️',
            label: 'No coding needed',
            sub: 'Just fill in your details',
          },
          {
            emoji: '⚡',
            label: 'Live in 5 minutes',
            sub: 'Automatic publishing',
          },
        ].map((item) => (
          <div
            key={item.label}
            className="border-border bg-secondary/30 flex items-start gap-3 rounded-xl border p-4"
          >
            <span className="text-2xl leading-none">{item.emoji}</span>
            <div>
              <p className="text-foreground text-xs font-semibold">
                {item.label}
              </p>
              <p className="text-muted-foreground text-[11px]">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
      >
        Let's get started
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

// ─── Step 1: Create GitHub account ───────────────────────────────────────────

function GitHubSignupMockup() {
  return (
    <div className="border-border bg-background mx-auto max-w-sm overflow-hidden rounded-2xl border shadow-lg">
      {/* Browser chrome */}
      <div className="bg-secondary border-border flex items-center gap-2 border-b px-3 py-2.5">
        <div className="flex gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
        </div>
        <div className="flex-1">
          <div className="bg-background border-border text-muted-foreground rounded border px-2 py-0.5 text-center font-mono text-[10px]">
            github.com/signup
          </div>
        </div>
      </div>
      {/* Page content */}
      <div className="p-6">
        <div className="mb-4 flex justify-center">
          <svg height="32" viewBox="0 0 16 16" className="fill-foreground">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </div>
        <h3 className="text-foreground mb-4 text-center text-sm font-semibold">
          Create your account
        </h3>
        <div className="mb-4 space-y-2.5">
          <div>
            <label className="text-muted-foreground mb-1 block text-[10px]">
              Username
            </label>
            <div className="border-border bg-secondary text-muted-foreground flex h-7 w-full items-center rounded border px-2 text-[11px]">
              janedoe
            </div>
          </div>
          <div>
            <label className="text-muted-foreground mb-1 block text-[10px]">
              Email address
            </label>
            <div className="border-border bg-secondary text-muted-foreground flex h-7 w-full items-center rounded border px-2 text-[11px]">
              jane@example.com
            </div>
          </div>
          <div>
            <label className="text-muted-foreground mb-1 block text-[10px]">
              Password
            </label>
            <div className="border-border bg-secondary text-muted-foreground flex h-7 w-full items-center rounded border px-2 text-[11px]">
              ••••••••••••
            </div>
          </div>
        </div>
        <div className="w-full rounded bg-[#2ea44f] py-2 text-center text-[11px] font-semibold text-white">
          Create account
        </div>
      </div>
    </div>
  );
}

function StepAccount({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <div className="mb-8 text-center">
        <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
          Step 1 of 4
        </p>
        <h2 className="text-foreground mb-3 font-serif text-2xl font-medium sm:text-3xl">
          Create a free GitHub account
        </h2>
        <p className="text-muted-foreground mx-auto max-w-md text-sm leading-relaxed">
          GitHub is a free service that will host your portfolio website. Think
          of it as the place where your portfolio "lives." Creating an account
          takes about 30 seconds.
        </p>
      </div>

      <div className="mb-8 grid items-start gap-8 md:grid-cols-2">
        <GitHubSignupMockup />

        <div className="space-y-5">
          <div className="flex gap-3">
            <div className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
              1
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                Go to GitHub.com
              </p>
              <p className="text-muted-foreground text-xs">
                Open the link below in a new tab. You'll see a simple sign-up
                form.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
              2
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                Choose a username
              </p>
              <p className="text-muted-foreground text-xs">
                Your username becomes part of your portfolio address:{' '}
                <span className="bg-secondary text-foreground rounded px-1 font-mono">
                  yourusername.github.io
                </span>
                . Choose something professional.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
              3
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                Verify your email
              </p>
              <p className="text-muted-foreground text-xs">
                GitHub will send you a quick verification email. Click the link
                inside it and you're in.
              </p>
            </div>
          </div>

          <div className="bg-primary/5 border-primary/15 rounded-xl border p-4">
            <p className="text-primary mb-1 text-xs font-medium">💡 Tip</p>
            <p className="text-muted-foreground text-xs">
              Already have a GitHub account? Great — skip straight to the next
              step!
            </p>
          </div>

          <a
            href={GITHUB_SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#2ea44f] px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            Create free account at GitHub.com
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-primary text-primary-foreground flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
        >
          I have an account — continue
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Copy the template ────────────────────────────────────────────────

function UseTemplateMockup() {
  return (
    <div className="border-border bg-background mx-auto max-w-sm overflow-hidden rounded-2xl border shadow-lg">
      <div className="bg-secondary border-border flex items-center gap-2 border-b px-3 py-2.5">
        <div className="flex gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
        </div>
        <div className="flex-1">
          <div className="bg-background border-border text-muted-foreground truncate rounded border px-2 py-0.5 text-center font-mono text-[10px]">
            github.com/git-vitae/git-vitae.github.io
          </div>
        </div>
      </div>
      <div className="p-5">
        {/* Repo header */}
        <div className="mb-3 flex items-center gap-2">
          <div className="bg-primary/20 text-primary flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold">
            GV
          </div>
          <span className="text-muted-foreground text-xs">git-vitae / </span>
          <span className="text-foreground text-xs font-semibold">
            git-vitae.github.io
          </span>
        </div>
        <p className="text-muted-foreground mb-4 text-[11px]">
          A free portfolio website template — edit one file, go live in minutes.
        </p>
        {/* Action buttons */}
        <div className="flex gap-2">
          <div className="border-border text-muted-foreground bg-secondary flex-1 rounded border py-1.5 text-center text-[11px]">
            ⭐ Star
          </div>
          {/* Highlighted button */}
          <div className="ring-offset-background flex-1 rounded bg-[#2ea44f] py-1.5 text-center text-[11px] font-semibold text-white ring-2 ring-[#2ea44f] ring-offset-2">
            Use this template ▾
          </div>
        </div>
        <div className="border-primary/30 bg-primary/5 mt-3 rounded border-2 border-dashed p-2 text-center">
          <span className="text-primary text-[10px] font-medium">
            👆 Click this green button
          </span>
        </div>
      </div>
    </div>
  );
}

function NamingMockup() {
  return (
    <div className="border-border bg-background overflow-hidden rounded-xl border shadow-md">
      <div className="border-border bg-secondary border-b px-4 py-3">
        <p className="text-muted-foreground font-mono text-[11px]">
          Create a new repository from template
        </p>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <label className="text-muted-foreground mb-1 block text-[10px]">
            Repository name <span className="text-red-400">*</span>
          </label>
          <div className="flex items-center gap-1 text-[11px]">
            <span className="text-muted-foreground bg-secondary border-border rounded-l border px-2 py-1.5">
              janedoe /
            </span>
            <div className="bg-background border-primary text-foreground ring-primary flex-1 rounded-r border px-2 py-1.5 font-mono font-semibold ring-1">
              janedoe.github.io
            </div>
          </div>
          <p className="text-primary mt-1 text-[10px]">
            ✓ Use your own username here
          </p>
        </div>
        <div className="rounded bg-[#2ea44f] py-2 text-center text-[11px] font-semibold text-white">
          Create repository from template
        </div>
      </div>
    </div>
  );
}

function StepTemplate({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <div className="mb-8 text-center">
        <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
          Step 2 of 4
        </p>
        <h2 className="text-foreground mb-3 font-serif text-2xl font-medium sm:text-3xl">
          Copy the portfolio template
        </h2>
        <p className="text-muted-foreground mx-auto max-w-md text-sm leading-relaxed">
          You're going to make your own personal copy of the GitVitae template.
          There are two ways — pick whichever feels simpler.
        </p>
      </div>

      {/* Two-path explanation */}
      <div className="mx-auto mb-8 grid w-full max-w-xl gap-3 text-left sm:grid-cols-2">
        <div className="border-primary/30 bg-primary/5 rounded-xl border-2 p-3.5">
          <p className="text-foreground mb-1 flex items-center gap-1.5 text-xs font-semibold">
            <span className="bg-primary text-primary-foreground rounded px-1.5 py-0.5 text-[10px] font-bold">
              Recommended
            </span>
            "Use this template"
          </p>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            Creates a fresh copy with no git history. Cleaner and simpler for
            most people. Future updates via the Actions tab or{' '}
            <code className="text-primary bg-secondary rounded px-1 font-mono">
              pnpm upgrade-template
            </code>
            .
          </p>
        </div>
        <div className="border-border rounded-xl border p-3.5">
          <p className="text-foreground mb-1 text-xs font-semibold">Fork</p>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            Links your copy back to GitVitae. You get GitHub's built-in{' '}
            <strong className="text-foreground">"Sync fork"</strong> button for
            one-click updates — handy if you're already comfortable with git.
          </p>
        </div>
      </div>

      <div className="mb-6 grid items-start gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <UseTemplateMockup />
          <div className="mt-2">
            <NamingMockup />
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex gap-3">
            <div className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
              1
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                Open the template page
              </p>
              <p className="text-muted-foreground text-xs">
                Click the button below. You'll land on the GitVitae template
                page on GitHub.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
              2
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                Click "Use this template"{' '}
                <span className="text-muted-foreground font-normal">or</span>{' '}
                "Fork"
              </p>
              <p className="text-muted-foreground text-xs">
                Green "Use this template" button → "Create a new repository" is
                the quickest path. Or click "Fork" in the top-right if you want
                the sync button later.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
              3
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                Name your repository
              </p>
              <p className="text-muted-foreground text-xs">
                In the "Repository name" box, type exactly:
              </p>
              <div className="bg-secondary border-border text-foreground mt-1.5 flex items-center gap-1 rounded-lg border px-2.5 py-1.5 font-mono text-xs">
                <span className="text-muted-foreground">yourusername</span>
                <span>.github.io</span>
                <InlineCopy text="yourusername.github.io" />
              </div>
              <p className="text-muted-foreground mt-1 text-[11px]">
                Replace "yourusername" with your actual GitHub username.
              </p>
              {/* URL benefit callout */}
              <div className="bg-primary/5 border-primary/15 mt-2 space-y-1 rounded-lg border p-2.5">
                <p className="text-primary text-[10px] font-semibold">
                  ✨ Why this name matters
                </p>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span className="font-bold text-green-600 dark:text-green-400">
                    ✓
                  </span>
                  <span className="text-foreground font-mono">
                    yourusername.github.io
                  </span>
                  <span className="text-muted-foreground">
                    — short, clean URL
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span className="font-bold text-red-400">✗</span>
                  <span className="text-muted-foreground font-mono line-through">
                    yourusername.github.io/my-portfolio
                  </span>
                </div>
                <p className="text-muted-foreground text-[10px]">
                  Naming it{' '}
                  <span className="font-mono">username.github.io</span> is the
                  only way to get the short address — any other name adds a long
                  path at the end.
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
              4
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                Click "Create repository"
              </p>
              <p className="text-muted-foreground text-xs">
                That's it! Your copy of the template is now ready to
                personalise.
              </p>
            </div>
          </div>

          <a
            href={GITHUB_TEMPLATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#2ea44f] px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            Open the template on GitHub
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-primary text-primary-foreground flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
        >
          I've copied the template — continue
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Edit your details ────────────────────────────────────────────────

function FileEditorMockup() {
  return (
    <div className="grid">
      <div className="border-border bg-background mx-auto max-w-sm overflow-hidden rounded-2xl border shadow-lg">
        <div className="bg-secondary border-border flex items-center gap-2 border-b px-3 py-2.5">
          <div className="flex gap-1">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
          </div>
          <div className="flex-1">
            <div className="bg-background border-border text-muted-foreground truncate rounded border px-2 py-0.5 text-center font-mono text-[10px]">
              github.com / janedoe / janedoe.github.io
            </div>
          </div>
        </div>
        {/* File browser row */}
        <div className="border-border bg-secondary/50 flex items-center justify-between border-b px-4 py-2">
          <div className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
            <span className="text-primary font-medium">janedoe.github.io</span>
            <ChevronRight size={10} />
            <span className="text-foreground font-mono font-semibold">
              portfolio.config.yaml
            </span>
          </div>
          <div className="flex items-center gap-1 rounded bg-[#2ea44f] px-2 py-0.5 text-[10px] font-semibold text-white">
            ✏️ Edit
          </div>
        </div>
        {/* File content */}
        <div className="p-4 font-mono text-[11px] leading-relaxed">
          <div className="text-primary/50"># Fill in your details below</div>
          <div className="mt-1">
            <span className="text-blue-500 dark:text-blue-400">name</span>:{' '}
            <span className="rounded bg-yellow-200/60 px-1 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300">
              "Git Vitae"
            </span>
            <span className="text-primary/40 ml-1 text-[10px]">
              ← change this
            </span>
          </div>
          <div>
            <span className="text-blue-500 dark:text-blue-400">title</span>:{' '}
            <span className="rounded bg-yellow-200/60 px-1 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300">
              "Full-Stack Engineer"
            </span>
          </div>
          <div>
            <span className="text-blue-500 dark:text-blue-400">email</span>:{' '}
            <span className="rounded bg-yellow-200/60 px-1 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300">
              "git-vitae@proton.me"
            </span>
          </div>
          <div>
            <span className="text-blue-500 dark:text-blue-400">location</span>:{' '}
            <span className="text-green-600 dark:text-green-400">
              "San Francisco, CA"
            </span>
          </div>
          <div className="text-primary/50 mt-1">
            # Don't forget to change siteMode!
          </div>
          <div>
            <span className="text-blue-500 dark:text-blue-400">siteMode</span>:{' '}
            <span className="rounded bg-yellow-200/60 px-1 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300">
              "landing"
            </span>
            <span className="text-primary/40 ml-1 text-[10px]">
              ← change to "portfolio"
            </span>
          </div>
          <div className="text-foreground/20 mt-1">...</div>
        </div>
        <div className="px-4 pb-4">
          <div className="w-full rounded bg-[#2ea44f] py-1.5 text-center text-[11px] font-semibold text-white">
            Commit changes
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
          <p className="mb-1 text-xs font-medium text-amber-700 dark:text-amber-400">
            ⚠️ Important — siteMode
          </p>
          <p className="text-xs text-amber-700/80 dark:text-amber-400/80">
            Change <span className="font-mono">siteMode</span> from{' '}
            <span className="font-mono">"landing"</span> to{' '}
            <span className="font-mono">"portfolio"</span> — otherwise you'll
            still see the GitVitae introduction page instead of your portfolio.
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
          <p className="mb-1 text-xs font-medium text-amber-700 dark:text-amber-400">
            ⚠️ Important — siteUrl
          </p>
          <p className="text-xs text-amber-700/80 dark:text-amber-400/80">
            Set <span className="font-mono">siteUrl</span> to your real GitHub
            Pages address, e.g.{' '}
            <span className="font-mono">https://janedoe.github.io</span>. If you
            leave it as the placeholder, section share-links and your RSS feed
            will point to the wrong URL.
          </p>
        </div>
      </div>
    </div>
  );
}

function StepEdit({ onNext }: { onNext: () => void }) {
  const fields = [
    { field: 'name', desc: 'Your full name', example: '"Jane Doe"' },
    {
      field: 'title',
      desc: 'Your job title or role',
      example: '"UX Designer"',
    },
    {
      field: 'email',
      desc: 'Your email address',
      example: '"jane@example.com"',
    },
    {
      field: 'tagline',
      desc: 'One line about yourself',
      example: '"I design things people love."',
    },
    { field: 'location', desc: "Where you're based", example: '"London, UK"' },
    {
      field: 'siteUrl',
      desc: 'Your GitHub Pages URL',
      example: '"https://janedoe.github.io"',
    },
    {
      field: 'siteMode',
      desc: 'Change to show your portfolio',
      example: '"portfolio"',
    },
  ];

  return (
    <div>
      <div className="mb-8 text-center">
        <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
          Step 4 of 4
        </p>
        <h2 className="text-foreground mb-3 font-serif text-2xl font-medium sm:text-3xl">
          Fill in your details
        </h2>
        <p className="text-muted-foreground mx-auto max-w-md text-sm leading-relaxed">
          In your new repository, find and open the file called{' '}
          <span className="bg-secondary text-foreground rounded px-1.5 py-0.5 font-mono text-xs">
            portfolio.config.yaml
          </span>
          . Replace the placeholder text with your own information.
        </p>
      </div>

      <div className="mb-6 grid items-start gap-8 md:grid-cols-2">
        <FileEditorMockup />

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
              1
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                Open the settings file
              </p>
              <p className="text-muted-foreground text-xs">
                In your new repository, click on the file called{' '}
                <span className="bg-secondary text-foreground rounded px-1 font-mono">
                  portfolio.config.yaml
                </span>
                . Then click the pencil icon (✏️) to edit it.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
              2
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                Replace the highlighted fields
              </p>
              <p className="text-muted-foreground mb-3 text-xs">
                Look for lines that have a colon (
                <span className="font-mono">:</span>) and replace the text in
                quotation marks. Start with these key fields:
              </p>
              <div className="border-border overflow-hidden rounded-xl border">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-secondary border-border border-b">
                      <th className="text-muted-foreground px-3 py-2 text-left font-medium">
                        Field
                      </th>
                      <th className="text-muted-foreground px-3 py-2 text-left font-medium">
                        What to put
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((f, i) => (
                      <tr
                        key={f.field}
                        className={i % 2 === 0 ? '' : 'bg-secondary/30'}
                      >
                        <td className="text-primary px-3 py-2 font-mono">
                          {f.field}
                        </td>
                        <td className="text-muted-foreground px-3 py-2">
                          {f.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
              3
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                Save your changes
              </p>
              <p className="text-muted-foreground text-xs">
                Scroll to the bottom and click the green{' '}
                <strong className="text-foreground">"Commit changes"</strong>{' '}
                button. Your portfolio will update automatically within 1–2
                minutes.
              </p>
            </div>
          </div>

          {/* Colour theme picker */}
          <div className="flex gap-3">
            <div className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
              3
            </div>
            <div className="flex-1">
              <p className="text-foreground mb-1 text-sm font-medium">
                Pick a colour theme{' '}
                <span className="text-muted-foreground text-xs font-normal">
                  (optional)
                </span>
              </p>
              <p className="text-muted-foreground mb-3 text-xs">
                Find the{' '}
                <span className="bg-secondary text-foreground rounded px-1 font-mono">
                  colorPreset
                </span>{' '}
                field and replace it with one of these names. Click a swatch to
                copy it.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'indigo', label: 'Indigo', hsl: '250 84% 60%' },
                  { value: 'emerald', label: 'Emerald', hsl: '160 72% 40%' },
                  { value: 'rose', label: 'Rose', hsl: '340 75% 55%' },
                  { value: 'amber', label: 'Amber', hsl: '38 95% 50%' },
                  { value: 'ocean', label: 'Ocean', hsl: '196 80% 42%' },
                  { value: 'slate', label: 'Slate', hsl: '215 30% 38%' },
                ].map((p) => (
                  <button
                    key={p.value}
                    title={`Copy: colorPreset: "${p.value}"`}
                    onClick={() =>
                      navigator.clipboard?.writeText(p.value).catch(() => {})
                    }
                    className="border-border hover:border-primary/40 bg-background hover:bg-secondary text-foreground group flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all"
                  >
                    <span
                      className="ring-border h-3 w-3 rounded-full ring-1 transition-transform group-hover:scale-125"
                      style={{ background: `hsl(${p.hsl})` }}
                    />
                    {p.label}
                  </button>
                ))}
              </div>
              <p className="text-muted-foreground mt-2 text-[11px]">
                Click any swatch to copy the preset name to your clipboard.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-primary text-primary-foreground flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
        >
          I've saved my changes — finish!
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Enable GitHub Pages ─────────────────────────────────────────────

function GitHubPagesMockup() {
  return (
    <div className="border-border bg-background mx-auto max-w-sm overflow-hidden rounded-2xl border shadow-lg">
      {/* Browser chrome */}
      <div className="bg-secondary border-border flex items-center gap-2 border-b px-3 py-2.5">
        <div className="flex gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
        </div>
        <div className="flex-1">
          <div className="bg-background border-border text-muted-foreground truncate rounded border px-2 py-0.5 text-center font-mono text-[10px]">
            github.com/janedoe/janedoe.github.io/settings/pages
          </div>
        </div>
      </div>
      {/* Layout: sidebar + content */}
      <div className="divide-border flex divide-x text-[10px]">
        {/* Sidebar */}
        <div className="bg-secondary/40 w-28 shrink-0 space-y-0.5 p-3">
          <p className="text-muted-foreground mb-2 font-medium">Settings</p>
          {['General', 'Access', 'Code security', 'Branches'].map((item) => (
            <div key={item} className="text-muted-foreground rounded px-2 py-1">
              {item}
            </div>
          ))}
          <div className="bg-primary/10 text-primary ring-primary/20 rounded px-2 py-1 font-semibold ring-1">
            Pages
          </div>
          {['Integrations', 'Environments'].map((item) => (
            <div key={item} className="text-muted-foreground rounded px-2 py-1">
              {item}
            </div>
          ))}
        </div>
        {/* Main panel */}
        <div className="flex-1 space-y-3 p-4">
          <p className="text-foreground text-[11px] font-semibold">
            GitHub Pages
          </p>
          {/* Live banner */}
          <div className="space-y-0.5 rounded-lg border border-[#2ea44f]/30 bg-[#2ea44f]/10 p-2 font-medium text-[#2ea44f]">
            <div>✓ Your site will be live at</div>
            <div className="font-mono">https://janedoe.github.io</div>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">
              Build and deployment · Source
            </p>
            <div className="border-primary bg-background ring-primary/30 flex items-center justify-between rounded border px-2 py-1.5 ring-1">
              <span className="text-foreground font-medium">
                GitHub Actions
              </span>
              <span className="text-muted-foreground">▾</span>
            </div>
            <div className="text-primary mt-1 font-medium">
              👆 Select this option
            </div>
          </div>
          <div className="rounded bg-[#2ea44f] py-1.5 text-center font-semibold text-white">
            Save
          </div>
        </div>
      </div>
    </div>
  );
}

function StepPages({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <div className="mb-8 text-center">
        <p className="text-primary mb-2 font-mono text-xs tracking-widest uppercase">
          Step 3 of 4
        </p>
        <h2 className="text-foreground mb-3 font-serif text-2xl font-medium sm:text-3xl">
          Enable GitHub Pages
        </h2>
        <p className="text-muted-foreground mx-auto max-w-md text-sm leading-relaxed">
          GitHub Pages is the free hosting service that makes your portfolio
          visible on the internet. You need to switch it on once — it takes
          about 30 seconds.
        </p>
      </div>

      <div className="mb-6 grid items-start gap-8 md:grid-cols-2">
        <GitHubPagesMockup />

        <div className="space-y-5">
          <div className="flex gap-3">
            <div className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
              1
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                Open your repository settings
              </p>
              <p className="text-muted-foreground text-xs">
                Go to your new repository on GitHub. Click the{' '}
                <strong className="text-foreground">Settings</strong> tab near
                the top of the page (it has a gear ⚙️ icon).
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
              2
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                Click "Pages" in the sidebar
              </p>
              <p className="text-muted-foreground text-xs">
                In the left-hand menu, scroll down until you see{' '}
                <strong className="text-foreground">Pages</strong>. Click it.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
              3
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                Set Source to "GitHub Actions"
              </p>
              <p className="text-muted-foreground text-xs">
                Under{' '}
                <strong className="text-foreground">
                  Build and deployment
                </strong>
                , click the Source dropdown and choose{' '}
                <strong className="text-foreground">GitHub Actions</strong>.
                Then click <strong className="text-foreground">Save</strong>.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold">
              4
            </div>
            <div>
              <p className="text-foreground mb-1 text-sm font-medium">
                Wait ~2 minutes
              </p>
              <p className="text-muted-foreground text-xs">
                GitHub will build and publish your site automatically. You'll
                see a green banner saying your site is live at{' '}
                <span className="bg-secondary text-foreground rounded px-1 font-mono">
                  yourusername.github.io
                </span>{' '}
                once it's done.
              </p>
            </div>
          </div>

          {/* First build fail notice */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
            <p className="mb-1 text-xs font-medium text-amber-700 dark:text-amber-400">
              ⚠️ The first build will fail — that's normal
            </p>
            <p className="text-xs text-amber-700/80 dark:text-amber-400/80">
              When you created the repository, GitHub tried to build it before
              Pages was configured. That first attempt fails. Once you've
              enabled Pages above, just make any tiny edit to your{' '}
              <span className="font-mono">portfolio.config.yaml</span> file and
              save it — that triggers a fresh build which will succeed.
            </p>
          </div>

          <div className="bg-primary/5 border-primary/15 rounded-xl border p-4">
            <p className="text-primary mb-1 text-xs font-medium">
              💡 Don't see the Pages option?
            </p>
            <p className="text-muted-foreground text-xs">
              If your repository is private, Pages won't appear. Make sure you
              created a <strong className="text-foreground">Public</strong>{' '}
              repository when copying the template.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-primary text-primary-foreground flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
        >
          Pages is enabled — continue
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── What's new panel (used in StepDone) ──────────────────────────────────────

const CHANGELOG_REMOTE_URL =
  'https://raw.githubusercontent.com/git-vitae/git-vitae.github.io/main/CHANGELOG.md';
const CACHE_KEY = 'gitvitae-changelog-v1';

function WhatsNew() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState<string>(bundledChangelog);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      setText(cached);
      return;
    }
    setRefreshing(true);
    fetch(CHANGELOG_REMOTE_URL)
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((t) => {
        sessionStorage.setItem(CACHE_KEY, t);
        setText(t);
      })
      .catch(() => {})
      .finally(() => setRefreshing(false));
  }, []);

  // Parse just the latest version block — skip the preamble, find first ## [x.y.z] block
  const latest = (() => {
    const blocks = text.split(/^## /m).filter(Boolean);
    const versionBlock = blocks.find((b) => /^\[/.test(b.trim()));
    return versionBlock ? `## ${versionBlock}` : null;
  })();

  // Convert the markdown block to simple JSX — no need for full react-markdown here
  const lines = (latest ?? '').split('\n').filter((l) => l.trim());
  const versionLine =
    lines.find((l) => l.startsWith('## '))?.replace('## ', '') ?? '';
  const items: { heading: string; bullets: string[] }[] = [];
  let cur: { heading: string; bullets: string[] } | null = null;
  for (const line of lines) {
    if (line.startsWith('### ')) {
      if (cur) items.push(cur);
      cur = { heading: line.replace('### ', ''), bullets: [] };
    } else if (line.startsWith('- ') && cur) {
      cur.bullets.push(line.replace(/^- /, ''));
    }
  }
  if (cur) items.push(cur);

  return (
    <div className="border-primary/20 bg-primary/5 mx-auto mb-8 w-full max-w-lg overflow-hidden rounded-2xl border text-left">
      <button
        onClick={() => setOpen((o) => !o)}
        className="hover:bg-primary/5 flex w-full items-center justify-between px-4 py-3 transition-colors"
      >
        <span className="text-foreground flex items-center gap-2 text-sm font-medium">
          <Sparkles size={14} className="text-primary" />
          {versionLine
            ? `What's new — ${versionLine}`
            : "What's new in GitVitae"}
          {refreshing && (
            <RefreshCw
              size={11}
              className="text-muted-foreground animate-spin"
            />
          )}
        </span>
        <ChevronDown
          size={14}
          className={`text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && items.length > 0 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-primary/10 space-y-3 border-t px-4 pt-3 pb-4">
              {items.map((item) => (
                <div key={item.heading}>
                  <p className="text-primary mb-1.5 font-mono text-[10px] font-semibold tracking-widest uppercase">
                    {item.heading}
                  </p>
                  <ul className="space-y-1">
                    {item.bullets.map((b, i) => {
                      const [bold, ...rest] = b.split(' — ');
                      return (
                        <li
                          key={i}
                          className="text-muted-foreground flex items-start gap-2 text-xs leading-snug"
                        >
                          <span className="bg-primary/50 mt-1 h-1 w-1 shrink-0 rounded-full" />
                          <span>
                            <strong className="text-foreground font-medium">
                              {bold.replace(/\*\*/g, '')}
                            </strong>
                            {rest.length > 0 ? ` — ${rest.join(' — ')}` : ''}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              <a
                href="https://github.com/git-vitae/git-vitae.github.io/blob/main/CHANGELOG.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary mt-1 inline-flex items-center gap-1 text-[11px] underline-offset-2 hover:underline"
              >
                Full changelog <ExternalLink size={10} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Step 4: All done ─────────────────────────────────────────────────────────

function StepDone() {
  const NEXT_STEPS = [
    {
      emoji: '🎨',
      title: 'Change your colour theme',
      desc: 'Edit the colorPreset field in your settings file. Try: indigo, emerald, rose, amber, ocean.',
    },
    {
      emoji: '📸',
      title: 'Add your photo',
      desc: 'Upload a photo to your repository and paste the link in the avatarUrl field.',
    },
    {
      emoji: '📄',
      title: 'Print your resume',
      desc: 'Visit /resume on your portfolio to see a beautiful printable resume — all generated from your settings file.',
    },
    {
      emoji: '🔗',
      title: 'Add your own domain',
      desc: 'In your repository settings, find "Pages" and add your custom domain (e.g. janedoe.com).',
    },
    {
      emoji: '📊',
      title: "See who's visiting (free)",
      desc: 'GitHub already tracks your visitors — go to your repository → Insights → Traffic. For more detail, add a free GoatCounter code to your settings file.',
    },
    {
      emoji: '⬆️',
      title: 'Get future updates',
      desc: 'Open your fork on GitHub and click "Sync fork" — that\'s it. Because you only edit portfolio.config.yaml, updates never cause conflicts.',
    },
  ];

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-6 text-6xl"
      >
        🎉
      </motion.div>
      <h2 className="text-foreground mb-4 font-serif text-2xl font-medium sm:text-3xl">
        You're all set!
      </h2>
      <p className="text-muted-foreground mx-auto mb-3 max-w-md text-sm leading-relaxed">
        GitHub is now publishing your portfolio. This usually takes{' '}
        <strong className="text-foreground">1–2 minutes</strong>. Once it's
        ready, visit your portfolio at:
      </p>
      <div className="bg-secondary border-border text-foreground mb-6 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-sm">
        https://<span className="text-primary">yourusername</span>.github.io
        <InlineCopy text="https://yourusername.github.io" />
      </div>

      {/* Build status checker */}
      <div className="border-border mx-auto mb-10 w-full max-w-lg overflow-hidden rounded-2xl border text-left">
        <div className="bg-secondary border-border flex items-center gap-2 border-b px-4 py-3">
          <span className="text-foreground text-sm font-medium">
            Check your build status
          </span>
          <span className="text-muted-foreground text-xs">
            — is it live yet?
          </span>
        </div>
        <div className="space-y-3 p-4">
          {/* Step */}
          <div className="flex items-start gap-3 text-xs">
            <span className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold">
              1
            </span>
            <p className="text-muted-foreground">
              Go to your repository on GitHub and click the{' '}
              <strong className="text-foreground">Actions</strong> tab.
            </p>
          </div>
          <div className="flex items-start gap-3 text-xs">
            <span className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold">
              2
            </span>
            <div className="space-y-1.5">
              <p className="text-muted-foreground">
                Look for a workflow run. The status dot tells you everything:
              </p>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 shrink-0 rounded-full bg-[#2ea44f]" />
                  <span className="text-foreground font-medium">Green</span>
                  <span className="text-muted-foreground">
                    — your portfolio is live! 🎉
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 shrink-0 animate-pulse rounded-full bg-yellow-400" />
                  <span className="text-foreground font-medium">Yellow</span>
                  <span className="text-muted-foreground">
                    — still building, check back in a minute
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 shrink-0 rounded-full bg-red-500" />
                  <span className="text-foreground font-medium">Red</span>
                  <span className="text-muted-foreground">
                    — first-run fail (expected). Make a small edit to your
                    config file and save — that re-triggers the build.
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Badge snippet */}
          <div className="pt-1">
            <p className="text-muted-foreground mb-1.5 text-[11px]">
              Optional: add this badge to your README so you always see the
              status at a glance
            </p>
            <div className="bg-secondary border-border text-muted-foreground flex items-center gap-2 overflow-x-auto rounded-lg border px-3 py-2 font-mono text-[10px]">
              <span>
                ![Deploy](https://github.com/
                <span className="text-primary">username</span>/
                <span className="text-primary">username</span>
                .github.io/actions/workflows/pages/pages-build-deployment/badge.svg)
              </span>
              <InlineCopy text="![Deploy](https://github.com/username/username.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)" />
            </div>
          </div>
        </div>
      </div>

      <WhatsNew />

      <p className="text-foreground mb-6 text-sm font-medium">
        What to do next
      </p>
      <div className="mx-auto mb-10 grid max-w-xl gap-4 text-left sm:grid-cols-2">
        {NEXT_STEPS.map((step) => (
          <div
            key={step.title}
            className="border-border hover:border-primary/30 hover:bg-secondary/30 rounded-xl border p-4 transition-all"
          >
            <div className="mb-2 text-2xl">{step.emoji}</div>
            <p className="text-foreground mb-1 text-xs font-semibold">
              {step.title}
            </p>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Staying up to date */}
      <div className="border-border mx-auto mb-10 w-full max-w-xl overflow-hidden rounded-2xl border text-left">
        <div className="bg-secondary border-border border-b px-4 py-3">
          <p className="text-foreground text-sm font-medium">
            Staying up to date
          </p>
          <p className="text-muted-foreground mt-0.5 text-[11px]">
            GitVitae releases new features regularly. Here's how to pull them
            into your portfolio.
          </p>
        </div>
        <div className="divide-border divide-y">
          {/* Path 1 — GitHub Actions (works for both "Use template" and Fork) */}
          <div className="flex items-start gap-3 p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#2ea44f]/20 bg-[#2ea44f]/10 text-[10px] font-bold text-[#2ea44f]">
              1
            </span>
            <div>
              <p className="text-foreground mb-0.5 text-xs font-semibold">
                Recommended — one-click from the Actions tab
                <span className="text-muted-foreground ml-1.5 text-[10px] font-normal">
                  (works for both "Use template" and Fork)
                </span>
              </p>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Your repository ships with a{' '}
                <strong className="text-foreground">
                  Sync GitVitae Template
                </strong>{' '}
                workflow. Go to your repo →{' '}
                <strong className="text-foreground">Actions</strong> →{' '}
                <strong className="text-foreground">
                  Sync GitVitae Template
                </strong>{' '}
                → <strong className="text-foreground">Run workflow</strong> →
                type{' '}
                <code className="text-primary bg-secondary rounded px-1 font-mono text-[10px]">
                  YES
                </code>{' '}
                → click the green button. Your{' '}
                <code className="text-primary bg-secondary rounded px-1 font-mono text-[10px]">
                  portfolio.config.yaml
                </code>{' '}
                is always preserved automatically.
              </p>
            </div>
          </div>
          {/* Path 2 — Sync fork (only for forks) */}
          <div className="flex items-start gap-3 p-4">
            <span className="bg-primary/10 border-primary/20 text-primary mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold">
              2
            </span>
            <div>
              <p className="text-foreground mb-0.5 text-xs font-semibold">
                GitHub "Sync fork" button
                <span className="text-muted-foreground ml-1.5 text-[10px] font-normal">
                  (only if you used Fork, not "Use template")
                </span>
              </p>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                If you forked the repo, GitHub shows a{' '}
                <strong className="text-foreground">"Sync fork"</strong> banner
                on your repo page when there are new template commits. Click it,
                then{' '}
                <strong className="text-foreground">"Update branch"</strong>.
                Fastest option if you have it — but it won't appear for "Use
                this template" repos.
              </p>
            </div>
          </div>
          {/* Path 3 — CLI */}
          <div className="flex items-start gap-3 p-4">
            <span className="bg-secondary border-border text-muted-foreground mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold">
              3
            </span>
            <div>
              <p className="text-foreground mb-0.5 text-xs font-semibold">
                Terminal
                <span className="text-muted-foreground ml-1.5 text-[10px] font-normal">
                  (works for both)
                </span>
              </p>
              <p className="text-muted-foreground mb-2 text-[11px] leading-relaxed">
                Clone your repo locally and run:
              </p>
              <div className="bg-secondary border-border text-foreground flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-[11px]">
                pnpm upgrade-template
                <InlineCopy text="pnpm upgrade-template" />
              </div>
            </div>
          </div>
          {/* Watch releases */}
          <div className="flex items-start gap-3 p-4">
            <span className="bg-secondary border-border text-muted-foreground mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold">
              ★
            </span>
            <div>
              <p className="text-foreground mb-0.5 text-xs font-semibold">
                Know when to update
              </p>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                On the{' '}
                <a
                  href="https://github.com/git-vitae/git-vitae.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  GitVitae repository
                </a>
                , click{' '}
                <strong className="text-foreground">
                  Watch → Custom → Releases
                </strong>
                . GitHub emails you when a new version ships.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="#/demo"
          className="border-border text-foreground hover:bg-secondary inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
        >
          See the live demo again
        </a>
        <a
          href="https://github.com/git-vitae/git-vitae.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
        >
          View on GitHub
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const labels = [
    'Welcome',
    'Import resume',
    'GitHub account',
    'Copy template',
    'Enable Pages',
    'Your details',
    'Done!',
  ];
  return (
    <div className="mb-10">
      <div className="mb-3 flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="relative flex-1">
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i < current
                  ? 'bg-primary'
                  : i === current
                    ? 'bg-primary/50'
                    : 'bg-border'
              }`}
            />
          </div>
        ))}
      </div>
      <div className="mb-3hidden grid grid-cols-7 gap-2 text-center text-xs font-medium text-gray-500 md:grid">
        {labels.map((label, i) => (
          <span
            key={label}
            className={`text-[12px] font-medium transition-colors ${
              i === current
                ? 'text-primary'
                : i < current
                  ? 'text-muted-foreground'
                  : 'text-border'
            } hidden sm:block`}
          >
            {i < current ? <Check size={12} className="mr-0.5 inline" /> : null}
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main wizard ──────────────────────────────────────────────────────────────

const STEP_COUNT = 7;

export function SetupPage() {
  const [step, setStep] = useState(0);
  const [resumeData, setResumeData] = useState<ExtractedResumeData | null>(null);

  const next = () => setStep((s) => Math.min(s + 1, STEP_COUNT - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const steps = [
    <StepWelcome onNext={next} />,
    <StepImport
      onNext={(data) => {
        if (data) {
          setResumeData(data);
        }
        next();
      }}
      onSkip={next}
    />,
    <StepAccount onNext={next} />,
    <StepTemplate onNext={next} />,
    <StepPages onNext={next} />,
    <StepEdit onNext={next} />,
    <StepDone />,
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Navbar */}
      <header className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a
            href="#/"
            className="text-3xl font-semibold tracking-tight transition-opacity hover:opacity-80"
          >
            Git<span className="text-primary">Vitae</span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="#/demo"
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              See demo
            </a>
          </div>
        </div>
      </header>

      {/* Wizard body */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        <ProgressBar current={step} total={STEP_COUNT} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>

        {/* Back navigation (not on welcome or done) */}
        {step > 0 && step < STEP_COUNT - 1 && (
          <div className="mt-8 flex items-center">
            <button
              onClick={back}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition-colors"
            >
              <ArrowLeft size={13} />
              Back
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
