import type { Metadata } from 'next'
import { 
  Inter, 
  Playfair_Display, 
  Poppins, 
  Dancing_Script, 
  Montserrat, 
  Lora, 
  Orbitron, 
  Great_Vibes 
} from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})
const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
})
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})
const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WorldQuestion - Daily World Questions',
  description: 'One world question every day. Vote, share, and be part of global trends.',
  keywords: 'voting, questions, world, trends, social, poll',
  authors: [{ name: 'WorldQuestion Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`
        ${inter.className} 
        ${playfair.variable} 
        ${poppins.variable}
        ${dancing.variable}
        ${montserrat.variable}
        ${lora.variable}
        ${orbitron.variable}
        ${greatVibes.variable}
      `}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  )
} 