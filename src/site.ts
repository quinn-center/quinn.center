// Site-wide constants. Everything that is a fact about the organization rather than page copy.
export const site = {
  name: 'Quinn Center',
  fullName: 'Quinn Center for Animal Welfare Innovation',
  tagline: 'Research. Technology. Community.',
  description:
    'The Quinn Center for Animal Welfare Innovation is a nonprofit research center bringing together experts in technology, community services, and animal welfare to solve the toughest challenges facing the human-animal bond.',
  email: 'info@quinn.center',
  discord: 'https://discord.gg/z8wm7rqhRA',
  github: 'https://github.com/quinn-center',
  // Newsletter signup. With a Buttondown username the subscribe form posts straight to Buttondown
  // (https://buttondown.com/api/emails/embed-subscribe/<username>). Leave it empty and the site
  // shows a "Subscribe" button that opens an email instead, so nothing breaks before the account exists.
  newsletter: {
    buttondown: '',
  },
  // A photo of Quinn, relative to public/ (for example '/images/quinn.jpg'). Empty shows the dog mark.
  quinnPhoto: '',
};

export type Post = {
  kind: 'blog' | 'newsletter';
  id: string;
  title: string;
  date: Date;
  description: string;
  url: string;
};

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(date);
}
