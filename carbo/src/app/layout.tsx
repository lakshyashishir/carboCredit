/*-
 *
 * Hedera Smart Contracts
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import '@/styles/globals.css';
import StyreneAWebFont from '@/fonts';
import dappMetadata from '@/utils/common/metadata';
import ChakraUIProviders from '@/libs/chakra/provider';
import BgGradient from '@/components/background-gradients';
import { Toaster } from "@/components/ui/toaster"


/** @notice Root Layout */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${StyreneAWebFont.variable}`}>
      <body className="bg-primary font-styrene">
        <ChakraUIProviders>
          <Toaster />
          <div className="relative 2xl:max-w-[100rem] 2xl:mx-auto">
            {children}
            <BgGradient />
          </div>
        </ChakraUIProviders>
      </body>
    </html>
  );
}

/** @notice export metadata for SEO */
export const metadata = dappMetadata;
