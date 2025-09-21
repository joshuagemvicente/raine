"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  CheckCircle,
  Users,
  Zap,
  Shield,
  Heart,
  Github,
  ExternalLink,
} from "lucide-react";

const navigationSections = [
  { id: "introduction", label: "Introduction", href: "#introduction" },
  { id: "features", label: "Features", href: "#features" },
  { id: "why-raine", label: "Why Raine", href: "#why-raine" },
  { id: "technology", label: "Technology", href: "#technology" },
  { id: "roadmap", label: "Roadmap", href: "#roadmap" },
  { id: "testimonials", label: "Testimonials", href: "#testimonials" },
  { id: "team", label: "Team", href: "#team" },
];

const features = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Lightning Fast",
    description:
      "No more waiting around for your app to load. Everything happens instantly, so you can focus on getting things done.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Built for Humans",
    description:
      "We designed Raine the way we'd want to use it ourselves - simple, clean, and actually enjoyable to use.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Rock Solid",
    description:
      "Your data stays safe and your tasks stay synced. We've got your back with enterprise-level security.",
  },
];

const roadmapItems = [
  {
    quarter: "Q1 2025",
    items: [
      "Core platform development",
      "User authentication",
      "Basic task management",
    ],
  },
  {
    quarter: "Q2 2025",
    items: ["Advanced features", "Mobile app", "API integration"],
  },
  {
    quarter: "Q3 2025",
    items: ["AI integration", "Team collaboration", "Analytics dashboard"],
  },
  {
    quarter: "Q4 2025",
    items: [
      "Enterprise features",
      "Third-party integrations",
      "Advanced automation",
    ],
  },
];

const testimonials = [
  {
    quote:
      "Raine has completely transformed how I organize my daily tasks. The interface is so clean and intuitive that I actually look forward to using it every morning.",
    name: "Sarah Chen",
    title: "Product Manager, TechCorp",
  },
  {
    quote:
      "Finally, a productivity app that doesn't overwhelm you with features. Raine strikes the perfect balance between simplicity and functionality.",
    name: "Marcus Rodriguez",
    title: "Freelance Designer",
  },
  {
    quote:
      "As a busy entrepreneur, I need tools that just work. Raine helps me stay focused on what matters most without getting lost in complexity.",
    name: "Emily Watson",
    title: "Founder, StartupXYZ",
  },
];

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationSections.map((section) => section.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Left Sidebar Navigation */}
        <aside className="fixed left-0 top-0 h-full w-64 bg-muted/30 border-r border-border overflow-y-auto pt-20">
          <div className="p-6">
            <div className="space-y-2">
              <h3 className="text-[13px] font-semibold text-muted-foreground mb-4">
                On This Page
              </h3>
              {navigationSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <a href="/" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Back to Home
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 pt-20">
          <div className="max-w-4xl mx-auto p-8">
            {/* Introduction Section */}
            <section id="introduction" className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-foreground">
                  About Raine
                </h1>
                <Button variant="outline" size="sm">
                  Copy Page
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-base text-muted-foreground mb-6">
                  Raine isn't just another todo app - it's the productivity tool
                  we wish we had years ago. We built it to actually help you get
                  things done, not just organize them endlessly.
                </p>

                <p className="text-xs text-muted-foreground mb-6">
                  Whether you're juggling personal projects or coordinating with
                  a team, Raine adapts to how you work. No complicated setups,
                  no overwhelming features - just a clean, fast way to turn your
                  ideas into action.
                </p>

                <div className="bg-muted/50 p-6 rounded-lg border">
                  <h3 className="text-base font-semibold mb-3">
                    What We Stand For
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs">
                        <strong>Keep it simple:</strong> No clutter, no
                        confusion - just what you need to get things done
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs">
                        <strong>Work your way:</strong> Raine fits into your
                        routine, not the other way around
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs">
                        <strong>Always reliable:</strong> When you need it, it's
                        there - no excuses, no downtime
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs">
                        <strong>Keep improving:</strong> We're always working to
                        make Raine better for you
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          {feature.icon}
                        </div>
                        <CardTitle className="text-base">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Why Raine Section */}
            <section id="why-raine" className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Why Choose Raine?</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-base font-semibold mb-4">
                    Built for Real People, Real Work
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Let's be honest - most productivity apps are either too
                    complicated or too basic. Raine hits the sweet spot:
                    powerful enough to handle your workload, simple enough that
                    you'll actually use it.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs">
                        Smart suggestions that actually make sense
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs">
                        Everything syncs instantly across all your devices
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs">
                        Easy collaboration without the chaos
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs">
                        Insights that help you work smarter, not harder
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-muted/30 p-6 rounded-lg">
                  <Image
                    src="/raine-new.png"
                    alt="Raine Interface"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </section>

            {/* Technology Section */}
            <section id="technology" className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Technology Stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "React", description: "Javascript Framework" },
                  { name: "Prisma", description: "Database ORM" },
                  { name: "PostgreSQL", description: "Database" },
                  { name: "Tailwind CSS", description: "Styling" },
                ].map((tech, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2">
                        {tech.name}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {tech.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Roadmap Section */}
            <section id="roadmap" className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Development Roadmap</h2>
              <div className="space-y-6">
                {roadmapItems.map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Badge variant="outline">{item.quarter}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {item.items.map((roadmapItem, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-center gap-2"
                          >
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs">{roadmapItem}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="mb-16">
              <h2 className="text-2xl font-bold mb-12 text-center">
                What People Are Saying
              </h2>
              <div className="space-y-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="text-center max-w-4xl mx-auto">
                    <blockquote className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Team Section */}
            <section id="team" className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="md:col-span-2 lg:col-span-3">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      Joshua Gem Vicente
                    </h3>
                    <p className="text-base text-muted-foreground mb-2">
                      Solo Developer & Founder
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      <strong>Papertrail</strong> - Building productivity
                      products
                    </p>
                    <p className="text-xs text-muted-foreground mb-6 max-w-2xl mx-auto">
                      Currently building Raine as one of the flagship products
                      under Papertrail, a company focused on creating tools that
                      actually help people get stuff done. I handle everything
                      from writing code to designing interfaces - basically
                      whatever it takes to make Raine awesome.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      <Badge variant="secondary">Full-Stack Developer</Badge>
                    </div>
                    {/* <div className="bg-muted/50 p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">
                        <strong>🚀 We're Hiring!</strong> As Papertrail and Raine grow, we're looking to expand our team. 
                        If you're passionate about productivity tools and innovative digital products, 
                        stay tuned for upcoming opportunities at Papertrail!
                      </p>
                    </div> */}
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </main>

        {/* Right Sidebar - On This Page */}
      </div>
    </div>
  );
}

