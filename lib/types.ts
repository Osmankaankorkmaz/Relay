export type Category =
  | "Holiday"
  | "Greetings"
  | "Birthday"
  | "Love"
  | "Friends"
  | "Family"
  | "Work"
  | "Education"
  | "Invite"
  | "ThankYou"
  | "Congrats"
  | "Motivation"
  | "Apology"
  | "Marketing"
  | "Utility"
  | "Seasonal"
  | "Timeless"
  | "Other";

export type Template = {
  id: string;
  slug: string;
  title: string;
  short: string;
  category: Category | string;
  variables: string[];
  themes: string[];
  featured?: boolean;
};

export type Collection = {
  id: string;
  slug: string;
  title: string;
  desc: string;
  templateSlugs: string[];
  featured?: boolean;
};

export type ThemePreset = {
  id: string;
  name: string;
  bg: string;
  card: string;
  text: string;
  accent: string;
  muted: string;
  dark?: boolean; // opsiyonel
};

export type Experience = {
  id: string;
  templateSlug: string;
  theme: string;
  vars: Record<string, string>;
  ref?: string;
  createdAt: string;
};

export type Submission = {
  id: string;
  title: string;
  category: string;
  desc: string;
  variables: string[];
  createdAt: string;
};

export type Analytics = {
  templates: Record<string, { views: number; uses: number; shares: number }>;
  experiences: { created: number; opened: number };
};

export type Settings = {
  brand: {
    productName: string;
    byline: string;
  };
  defaults: {
    defaultTheme: string;
    defaultTemplateSlug: string;
    defaultSenderName: string;
  };
  flags: {
    enableTrending: boolean;
    enableCollections: boolean;
    enableCommandPalette: boolean;
    enableChangelog: boolean;
    enableSubmissions: boolean;
  };
};
