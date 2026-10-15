import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Baku Electronics",
  description: "Məişət texnikası, telefon və elektronika",
};

const themeScript = `try{var t=localStorage.getItem('be-theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
