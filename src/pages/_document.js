import { Html, Head, Main, NextScript } from "next/document";
import { roboto } from "@/ui/fonts";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={`${roboto.className} antialiased`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
