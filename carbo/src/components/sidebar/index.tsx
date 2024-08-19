// import React from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { usePathname } from 'next/navigation';
// import { Home, User, FileText, ShoppingCart, BarChart2, Brain } from 'lucide-react';

// const NAV_SIDE_BAR_ITEMS = [
//   { name: 'Dashboard', path: '/dashboard', icon: Home },
//   { name: 'Profile', path: '/profile', icon: User },
//   { name: 'Emissions', path: '/emission', icon: FileText },
//   { name: 'Marketplace', path: '/marketplace', icon: ShoppingCart },
//   { name: 'Analytics', path: '/analytics', icon: BarChart2 },
//   { name: 'AI Insights', path: '/ai-insights', icon: Brain },
// ];

// const NavSideBar = () => {
//   const pathname = usePathname();

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -50 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{
//         delay: 0.3,
//         duration: 0.5,
//       }}
//       className="w-72 h-screen sticky left-0 top-10 border-r border-white/30 text-black flex flex-col gap-3 pt-7 text-lg font-light tracking-tight leading-6 pr-2"
//     >
//       {NAV_SIDE_BAR_ITEMS.map((item) => {
//         const Icon = item.icon;
//         return (
//           <Link
//             key={item.name}
//             href={item.path}
//             className={`${
//               pathname.includes(item.path) ? 'bg-hedera-green/20 font-normal text-hedera-green' : ''
//             } py-3 px-3 rounded-lg hover:bg-hedera-green/10 transition duration-300 flex items-center`}
//           >
//             <Icon className="mr-3" size={20} />
//             {item.name}
//           </Link>
//         );
//       })}
//     </motion.div>
//   );
// };

// export default NavSideBar;
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Home, User, FileText, ShoppingCart, BarChart2, Brain } from 'lucide-react';

const NAV_SIDE_BAR_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'Emissions', path: '/emission', icon: FileText },
  { name: 'Marketplace', path: '/marketplace', icon: ShoppingCart },
  { name: 'Analytics', path: '/analytics', icon: BarChart2 },
  { name: 'AI Insights', path: '/ai-insights', icon: Brain },
];

const NavSideBar = () => {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.5,
      }}
      className="fixed top-16 left-0 w-72 h-screen border-r border-white/30 text-black flex flex-col gap-3 pt-7 text-lg font-light tracking-tight leading-6 pr-2 z-50 bg-white"
    >
      {NAV_SIDE_BAR_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.path}
            className={`${
              pathname.includes(item.path) ? 'bg-hedera-green/20 font-normal text-hedera-green' : ''
            } py-3 px-3 rounded-lg hover:bg-hedera-green/10 transition duration-300 flex items-center`}
          >
            <Icon className="mr-3" size={20} />
            {item.name}
          </Link>
        );
      })}
    </motion.div>
  );
};

export default NavSideBar;
