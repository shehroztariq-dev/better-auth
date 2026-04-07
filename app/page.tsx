"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  Lock,
  Code,
  Shield,
  Smartphone,
  Database,
  Mail,
  LucideLoaderCircle,
  CheckCircle2,
} from "lucide-react";
import {
  SiBetterauth,
  SiDrizzle,
  SiNextdotjs,
  SiPostgresql,
  SiShadcnui,
  SiTailwindcss,
} from "react-icons/si";
import { FaGithub, FaLinkedin, FaLock } from "react-icons/fa";
import { BsTypescript } from "react-icons/bs";

import { authClient } from "@/lib/auth/auth-client";

export default function HomePage() {
  const { data: session, isPending: loading } = authClient.useSession();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LucideLoaderCircle className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono font-bold">
            <div className="p-1.5 bg-primary rounded-lg">
              <FaLock size={18} className="text-primary-foreground" />
            </div>
            <span className="text-lg">Auth Demo</span>
          </Link>

          <div className="flex items-center gap-3">
            {session ? (
              <>
                <span className="hidden sm:inline text-sm text-muted-foreground">
                  {session.user.email}
                </span>
                <Button asChild size="sm" variant="default">
                  <Link href="/dashboard">
                    Dashboard
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </>
            ) : (
              <Button asChild size="sm" variant="outline">
                <Link href="/auth">Sign In to Demo</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section - Personal Brand */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1 mb-6">
            <Smartphone size={14} className="text-primary" />
            <span className="text-sm font-medium">Full Stack Developer</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Authentication Demo
            <span className="text-primary"> Project</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Production-ready implementation of Better Auth with Next.js 15,
            showcasing modern authentication patterns and security best
            practices.
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {[
              "Next.js 15",
              "TypeScript",
              "Better Auth",
              "Tailwind CSS",
              "shadcn/ui",
              "PostgreSQL",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-secondary rounded-full text-sm font-mono">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href={session ? "/dashboard" : "/auth"}>
                {session ? "Go to Dashboard" : "Try Live Demo"}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#implementation">
                <Code className="mr-2 h-4 w-4" />
                View Implementation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Implementation Details - Shows YOUR work */}
      <section
        id="implementation"
        className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Implementation Highlights
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Key features implemented to demonstrate production-ready
            authentication
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {implementations.map((item, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-secondary rounded-md font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Live Demo Preview - Shows session state */}
      {session && (
        <section className="container mx-auto px-4 py-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-semibold">Live Session Active</h3>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <p>
                  <span className="font-mono text-muted-foreground">User:</span>{" "}
                  {session.user.name || session.user.email}
                </p>
                <p>
                  <span className="font-mono text-muted-foreground">
                    Email:
                  </span>{" "}
                  {session.user.email}
                </p>
                <p>
                  <span className="font-mono text-muted-foreground">
                    Session Status:
                  </span>{" "}
                  Authenticated & Active
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard">Access Protected Dashboard →</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Skills & Experience */}
      <section className="bg-secondary/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Developer Skills</h2>
            <p className="text-muted-foreground">
              Technologies and patterns demonstrated in this project
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={index} className="p-4">
                  <div className="flex items-start gap-2">
                    <div className="text-2xl">
                      <Icon />
                    </div>
                    <div className="flex flex-col ">
                      <div className="font-semibold ">{skill.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {skill.level}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Connect Section - Professional Links */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              View the Code
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              This project demonstrates production-ready authentication
              patterns. Check out the implementation or connect with me.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="outline" className="gap-2">
                <Link
                  href="https://github.com/yourusername/better-auth-demo"
                  target="_blank">
                  <FaGithub className="h-4 w-4" />
                  GitHub Repository
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link
                  href="https://linkedin.com/in/yourusername"
                  target="_blank">
                  <FaLinkedin className="h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link href="mailto:your.email@example.com">
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Demo Project • Full Stack Authentication Implementation • Built
              with Better Auth & Next.js 15
            </p>
            <p className="mt-1 text-xs">
              © 2024 Portfolio Project - Showcasing Production-Ready Auth
              Patterns
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Implementation details - YOUR work
const implementations = [
  {
    title: "Session Management",
    description:
      "Implemented secure session handling with automatic refresh, JWT validation, and proper logout flows.",
    icon: <Lock className="h-5 w-5 text-primary" />,
    tags: ["JWT", "Session Refresh", "Secure Cookies"],
  },
  {
    title: "OAuth Integration",
    description:
      "Configured Google and GitHub OAuth providers with proper redirect handling and error management.",
    icon: <Shield className="h-5 w-5 text-primary" />,
    tags: ["OAuth 2.0", "Google", "GitHub"],
  },
  {
    title: "Database Adapter",
    description:
      "PostgreSQL with Drizzle ORM for user management, sessions, and accounts.",
    icon: <Database className="h-5 w-5 text-primary" />,
    tags: ["PostgreSQL", "Drizzle", "Migrations"],
  },
  {
    title: "Protected Routes",
    description:
      "Middleware implementation for route protection and role-based access control.",
    icon: <Shield className="h-5 w-5 text-primary" />,
    tags: ["Middleware", "RBAC", "Route Guards"],
  },
];

// Skills demonstrated
const skills = [
  { name: "Better Auth", level: "Implementation", icon: SiBetterauth },
  { name: "Next.js 15", level: "App Router", icon: SiNextdotjs },
  { name: "TypeScript", level: "Type Safety", icon: BsTypescript },
  { name: "Tailwind CSS", level: "Responsive UI", icon: SiTailwindcss },
  { name: "PostgreSQL", level: "Database", icon: SiPostgresql },
  { name: "Drizzle ORM", level: "TypeScript ORM", icon: SiDrizzle },
  { name: "shadcn/ui", level: "Component Library", icon: SiShadcnui },
  { name: "Auth Patterns", level: "Security Best Practices", icon: FaLock },
];
