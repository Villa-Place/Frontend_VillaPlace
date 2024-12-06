// app/admin/layout.tsx
import React from 'react';
import SidebarMitra from '@/components/SidebarMitra';

export default function MitraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-200">
      <SidebarMitra />
      <main className="lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}