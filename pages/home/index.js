import HeadContent from "@/components/Home/HeaderContent";
import Player from "@/components/Home/player";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/signin");
    }
  }, [router, session]);

  const backgroundImageStyle = {
    backgroundImage: 'url("/images/back.png")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
     minHeight: "100vh",
    //marginBottom:"10rem",
    
    
    // maxHeight: "100vh",
    // overflowY: "scroll",
  };

  //style={{ maxHeight: '100vh', overflowY: 'scroll' }}
  return (
    <div style={backgroundImageStyle}>
      <HeadContent />
      <Player />
    </div>
  );
}
