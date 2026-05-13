import { FooterBlur } from "@/components/landing/footer/footer-blur";
import { XIcon, LinkedInIcon, GithubIcon } from "@/components/landing/footer/icons";
import Link from "next/link";

const links = [


  {
    title: "Company",
    links: [
      {
        label: "Terms & Conditions",
        href: "/terms-and-conditions",
        title: "Read our Terms & Conditions",
      },
      {
        label: "Privacy Policy",
        href: "/privacy-policy",
        title: "Read our Privacy Policy",
      },
    ],
  },
  {
    title: "Follow Us",
    links: [
      {
        label: (
          <div className="flex items-center gap-2">
            <LinkedInIcon className="h-4 w-4" />
            <span>LinkedIn</span>
          </div>
        ),
        href: "https://www.linkedin.com/",
        title: "Connect with us on LinkedIn",
      },
      {
        label: (
          <div className="flex items-center gap-2">
            <GithubIcon className="h-4 w-4" />
            <span>Github</span>
          </div>
        ),
        href: "https://github.com/",
        title: "View our GitHub repository",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden py-8 md:py-12">
      <FooterBlur />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 tracking-tight md:flex-row md:items-center md:justify-center md:space-x-8">
        {links.map((link) => (
          <div key={link.title} className="mb-4 md:mb-0 text-center">
            <h3 className="text-muted-foreground mb-3">{link.title}</h3>
            <ul className="flex flex-col items-center gap-3">
              {link.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    title={link.title}
                    target={link.href.startsWith("https://") ? "_blank" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
