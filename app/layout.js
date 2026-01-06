import { Outfit, Ovo } from "next/font/google";
import "./globals.css";

const OutfitFont = Outfit({
  subsets: ["latin"], 
  weight: ["400"] 
});

const OvoFont = Ovo({
  subsets: ["latin"], 
  weight: ["400"]
});

export const metadata = {
  title: "Delta Inventory Portal | Delta Cooling Systems",
  description: "Internal inventory management portal for Delta Cooling Systems Limited. Manage products, stock levels, and QR-based item tracking securely.",
  icons: {
    icon: "/images/deltalogo.png"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${OutfitFont.className} ${OvoFont.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}