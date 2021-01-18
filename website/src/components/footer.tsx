import { Box, Container, Icon, Stack } from '@nature-ui/core';
import { Io, Md } from '@nature-ui/icons';
import siteConfig from 'configs/site-config';
import Link from 'next/link';
import React from 'react';
import { NigeriaFlag } from './nigeriaFlag';

// 🇳🇬

export const links = [
  {
    icon: Io.IoLogoGithub,
    label: 'Github',
    href: '//github.com/dnature',
  },
  {
    icon: Io.IoLogoTwitter,
    label: 'Twitter',
    href: '//twitter.com/DivineHycenth',
  },
  {
    icon: Io.IoGlobeOutline,
    label: 'Website',
    href: '//divinehycenth.com',
  },
  {
    icon: Io.IoLogoLinkedin,
    label: 'Linkedin',
    href: '//linkedin.com/in/dnature',
  },
  {
    icon: Md.MdEmail,
    label: 'Email',
    href: 'mailto:contact@divinehycenth.com',
  },
  {
    icon: Io.IoLogoDiscord,
    label: 'Discord',
    href: siteConfig.discord.url,
  },
];

type FooterLinkProps = {
  icon?: React.ElementType;
  href?: string;
  label?: string;
};
const FooterLink: React.FC<FooterLinkProps> = ({
  icon,
  href,
  label,
  ...rest
}) => (
  <Box as='span' {...rest}>
    <Link href={href} aria-label={label}>
      <a target='_blank'>
        <Icon as={icon} size='lg' className='text-gray-50' />
      </a>
    </Link>
  </Box>
);

const Footer = () => {
  return (
    <Box as='footer' className='border-t bg-white text-center py-16'>
      <Container size='xs' centered>
        <p className='text-sm'>
          <span>
            Proudly made in
            <NigeriaFlag />
          </span>
          <span>by Divine Hycenth</span>
        </p>
        <Stack direction='row' spacing='1rem' className='justify-center mt-3'>
          {links.map((link) => (
            <FooterLink key={link.href} {...link} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
