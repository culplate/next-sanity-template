import { TAGS } from './tags';

type WebhookBody = {
  _type?: string;
  slug?: {
    current?: string;
  };
  [key: string]: unknown;
};

export function mapWebhookToTags(body: WebhookBody | null): string[] {
  if (!body?._type) {
    return [TAGS.global];
  }

  const tags: string[] = [];

  switch (body._type) {
    case 'homePage':
      tags.push(TAGS.home);
      break;

    case 'siteSettings':
      tags.push(TAGS.settings, TAGS.home);
      break;

    case 'project':
      tags.push(TAGS.projects);
      if (body.slug?.current) {
        tags.push(TAGS.project(body.slug.current));
      }
      break;

    default:
      tags.push(TAGS.global);
  }

  return tags;
}
