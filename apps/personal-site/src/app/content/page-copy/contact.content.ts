import {
  ContactInfo,
  PageContent,
} from '../../shared/interfaces/pageContent/content.dto';

export const CONTACT_CONTENT: PageContent = {
  title: 'Get In Touch',
  description:
    "I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.",
  content: [
    {
      type: 'paragraph',
      content:
        "Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear from you. Feel free to reach out through any of the channels below.",
    },
    {
      type: 'paragraph',
      heading: "Let's Connect",
      content:
        'I typically respond to emails within 24 hours and am always excited to discuss new opportunities or technical challenges.',
    },
  ],
};

export const CONTACT_INFO: ContactInfo = {
  email: 'bryant@example.com',
  github: 'https://github.com/Bfranks56',
  linkedin: 'https://www.linkedin.com/in/bryantfranks/',
  location: 'Your City, State',
};
