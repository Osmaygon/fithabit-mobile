import { MobileNav } from "@/components/mobile-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 md:px-8">
      <div className="mx-auto w-full max-w-md flex-1 pb-28 lg:max-w-4xl">{children}</div>
      <MobileNav />
    </main>
  );
}

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <header className="mb-5 pt-2">
      {eyebrow && <p className="text-sm font-bold text-primary-dark">{eyebrow}</p>}
      <h1 className="font-serif text-4xl font-semibold tracking-tight">{title}</h1>
      {description && <p className="mt-2 text-[#607169]">{description}</p>}
    </header>
  );
}
