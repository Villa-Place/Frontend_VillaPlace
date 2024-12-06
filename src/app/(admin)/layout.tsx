// app/admin/layout.tsx
import React from 'react';
import SidebarAdmin from '@/components/SidebarAdmin';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-200">
      <SidebarAdmin />
      <main className="lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}