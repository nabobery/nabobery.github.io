/** Site metadata and navigation (replaces Hugo config.toml [params] + menu). */

export const SITE_URL = "https://nabobery.github.io" as const;

export const SITE_TITLE = "Nabobery";

export const SITE_TAGLINE = "Code and Development Maestro";

export const SITE_DESCRIPTION = "Nabobery's personal website — blog, projects, and notes.";

export const SITE_KEYWORDS = ["blog", "anime reviews", "developer", "personal"] as const;

export const AUTHOR = "Avinash Changrani";

export type NavItem = { label: string; href: string };

/** Main nav — order matches legacy Hugo menu. */
export const MAIN_NAV: NavItem[] = [
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/posts/" },
  { label: "Projects", href: "/projects/" },
  { label: "Contact", href: "/contact/" },
];

export type SocialLink = {
  name: string;
  href: string;
  /** Simple Icons slug or reserved 'email' for mailto handling */
  icon: "github" | "linkedin" | "discord" | "email" | "devdotto";
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", href: "https://github.com/nabobery/", icon: "github" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/avinash-changrani/",
    icon: "linkedin",
  },
  {
    name: "Discord",
    href: "https://discordapp.com/users/406718496609665025/",
    icon: "discord",
  },
  { name: "Email", href: "mailto:avinashchangranii99@gmail.com", icon: "email" },
  { name: "dev.to", href: "https://dev.to/nabobery", icon: "devdotto" },
];

export const ANIME_LINKS: { label: string; href: string }[] = [
  { label: "MyAnimeList", href: "https://myanimelist.net/profile/Nabobery" },
  { label: "AniList", href: "https://anilist.co/user/Nabobery" },
];
