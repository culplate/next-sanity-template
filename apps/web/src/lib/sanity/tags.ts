export const TAGS = {
  home: 'home',
  settings: 'settings',
  siteSettings: 'siteSettings',
  projects: 'projects',
  global: 'global',
  project: (slug: string) => `project:${slug}`,
} as const;
