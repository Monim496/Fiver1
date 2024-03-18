import MusicPlayer from "@/components/planetqproductioncomp/musicplayer";
import GlobalHeader from "@/components/planetqproductioncomp/GlobalHeader";
import Head from "next/head";

export default function Home(initialVideoLink) {
  const backgroundImageStyle = {
    backgroundImage: 'url("/images/back.png")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <>
      <Head>
        <title>Planet-Q-Production</title>
        <meta name="description" content="planet q production music player" />
        <link rel="icon" href="/images/small.webp" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9026841871239190"
          crossorigin="anonymous"></script>
      </Head>
      <div style={backgroundImageStyle}>
        <GlobalHeader />
        <MusicPlayer initialVideoLink={initialVideoLink} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Fetch initial video link here if needed
  const initialVideoLink = "https://youtu.be/I5uiP9ogijs?si=O33QCOnUKp-Y7eHG";
  return {
    props: {
      initialVideoLink,
    },
  };
}
