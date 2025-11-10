// app/layout.tsx

import React from 'react';
// لا يوجد استيراد لخطوط، لا يوجد استيراد لأي شيء معقد

export const metadata = {
  title: 'App Router Test',
  description: 'Isolation Test',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* تأكد من وجود وسم <body> بشكل صحيح */}
      <body>
        {children}
      </body>
    </html>
  );
}
