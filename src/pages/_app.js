import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
export default function App({ Component, pageProps }) {
 return (
    // Wrap the entire app with the SessionProvider
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
