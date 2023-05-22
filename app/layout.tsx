import "@styles/globals.scss";
import Menu from "./menu";
import Head from "next/head";

export const metadata = {
  title: "Mini Games",
  description: "테트리스, 스도쿠, 사천성, 같은 카드 찾기, 야구게임",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <body>
        <Menu />
        <audio src="/backgroundMusic.mp3" controls loop>
          Your browser does not support the audio element.
        </audio>
        {children}
      </body>
    </html>
  );
}
