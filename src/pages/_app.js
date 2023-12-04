import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "@/components/layout";
import { wrapper } from "@/store";
import { Web3Modal } from "./context/Web3Modal";

export function App({ Component, pageProps }) {
  return (
    <Web3Modal>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </Web3Modal>
  );
}

export default wrapper.withRedux(App);
