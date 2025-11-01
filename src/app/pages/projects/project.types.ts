export type Project = {
  title: string;
  slug: string;
  summary: string;
  description: string[];
  role: string;
  contributions: string[];
  tech: string[];
  highlights: string[];
  links: { demo?: string; repo?: string; case?: string };
  images: string[];
  video?: string;
  status?: 'online'|'offline'|'wip'|string;
  date?: string;
};
