import "./globals.css";

export const metadata = {
  title: "RideShare",
  description: "Udhëtimet për AAB",
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