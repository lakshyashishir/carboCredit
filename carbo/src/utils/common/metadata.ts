import { Metadata } from 'next';

const DAPP_NAME = 'CarboCredit';
const TITLE = 'CarboCredit | Hedera';
const DESCRIPTION = "Explore Hedera's CarboCredit through an intutive and exciting Dapp Playground";

const OFFICIAL_REPO_URL =
  'https://github.com/lakshyashishir/carboCredit';

const dappMetadata: Metadata = {
  // ######## DAPP ########
  applicationName: DAPP_NAME,
  keywords: [
    'CarboCredit',

    
  ],
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: '/hederafavicon.ico',
    shortcut: '/hederafavicon.ico',
  },
  metadataBase: new URL(OFFICIAL_REPO_URL),
  alternates: {
    canonical: '/',
  },

  // ######## OG ########
  openGraph: {
    siteName: DAPP_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
    type: 'website',
    url: '/',
  },

  // ######## Twitter ########
  twitter: {
    card: 'summary_large_image',
    site: OFFICIAL_REPO_URL,
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default dappMetadata;
