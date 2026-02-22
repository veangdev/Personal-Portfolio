import { Github, Linkedin, Mail } from "lucide-react";
import { TelegramIcon, FacebookIcon } from "@/lib/social-icons";
import { getYearsOfExperience } from "@/lib/utils";

interface SocialLink {
  icon: React.ComponentType;
  href: string;
  label: string;
}

export const SOCIAL_LINKS = {
  GITHUB: {
    href: "https://github.com/veangdev",
    label: "GitHub",
    icon: Github,
  },
  LINKEDIN: {
    href: "https://www.linkedin.com/in/veang-kroh-729937235/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  EMAIL: {
    href: "mailto:veangkroh@gmail.com",
    label: "Email",
    icon: Mail,
  },
  TELEGRAM: {
    href: "https://t.me/your_telegram_username", // TODO: replace with your Telegram username
    label: "Telegram",
    icon: TelegramIcon,
  },
  FACEBOOK: {
    href: "https://facebook.com/your_facebook_profile", // TODO: replace with your Facebook profile
    label: "Facebook",
    icon: FacebookIcon,
  },
} as const satisfies Record<string, SocialLink>;

export const USER_INFO = {
  name: "Kroh Veang",
  title: "Full Stack Developer",
  description: `Motivated Full-Stack Developer with ${getYearsOfExperience()} years of experience building scalable web apps and writing clean, efficient code.`,
  location: "St. 371, Borey Sorla, Sen Sok, Phnom Penh, Cambodia",
  email: "veangkroh@gmail.com",
  phone: "+855-97-614-9359",
} as const;

export const PROFILE_DATA = {
  ...USER_INFO,
  socialLinks: SOCIAL_LINKS,
} as const;
