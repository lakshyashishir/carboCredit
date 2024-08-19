'use client';

import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="w-full relative overflow-hidden left-0 z-[5000] bottom-0 text-center py-4 bg-[#f0f8f0] mt-12"
    >
      <p className="text-sm text-gray-600">
        Empowering individuals to make a positive impact on the environment
      </p>
    </motion.footer>
  );
};

export default Footer;
