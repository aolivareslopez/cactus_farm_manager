import './globals.css'
import Navbar from '../components/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="max-w-5xl mx-auto px-5 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}