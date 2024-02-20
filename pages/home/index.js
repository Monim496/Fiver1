import HeadContent from "@/components/Home/HeaderContent";
import Player from "@/components/Home/player";

export default function HomePage() {
  const backgroundImageStyle = {
    backgroundImage: 'url("/images/back.png")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <div style={backgroundImageStyle}>
      <HeadContent />
      <Player />
    </div>
  );
}
