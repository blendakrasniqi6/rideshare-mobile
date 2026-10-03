import "./globals.css";

export const metadata = {
  title: "RideShare Mobile",
  description: "Ushtrimi Javës 3 – Kartat dhe faqet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sq">
      <body>{children}</body>
    </html>
  );
}
