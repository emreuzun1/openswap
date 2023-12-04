import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "@/components/layout";
import { wrapper } from "@/store";

export function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  );
}

export default wrapper.withRedux(App);
