import "./globals.css";
import Pwa from "@/components/Pwa";

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
      <body>
        <Pwa />
        {children}
      </body>
    </html>
  );
}