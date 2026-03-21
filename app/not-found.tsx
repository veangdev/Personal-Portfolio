import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-xl text-muted-foreground">Page not found</p>
      <Link
        href="/"
        className="mt-4 px-6 py-2 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors"
      >
        Back to home
      </Link>
    </div>
  )
}
