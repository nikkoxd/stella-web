import Header from "./header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-4">
        {children}
      </main>
    </div>
  )
}
