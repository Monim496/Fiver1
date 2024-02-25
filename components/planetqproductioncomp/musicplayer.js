import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MusicPlayer(initialVideoLink) {
  const [isVideoLink, setIsVideoLink] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isThumbnail, setIsThumbnail] = useState("");
  const playerRef = useRef(null);

  useEffect(() => {
    fetch("/api/link/getlink")
      .then((response) => response.json())
      .then((links) => {
        setIsVideoLink(links);
        if (links && links.length > 0) {
          toast.success("Music successfully retrieved.", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((error) => {
        toast.error("An error occurred while fetching data.", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });

    fetch("/api/thumbnail/modifythumbnail")
      .then((response) => response.json())
      .then((newthumbnail) => {
        
        if (newthumbnail && newthumbnail.length > 0) {
          setIsThumbnail(newthumbnail[0].ThumbnailImage);
          toast.success("New Thumbnail added!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });

    const storedIndex = localStorage.getItem("currentVideoIndex");

    if (storedIndex !== null) {
      setCurrentVideoIndex(parseInt(storedIndex));
    } else {
      setCurrentVideoIndex(0);
    }
  }, [currentVideoIndex]);

  const handleVideoEnd = () => {
    const totalVideos = isVideoLink.length;

    // Generate a random index for the next video
    let randomIndex = Math.floor(Math.random() * totalVideos);

    // Ensure the random index is different from the current index
    while (randomIndex === currentVideoIndex) {
      randomIndex = Math.floor(Math.random() * totalVideos);
    }

    setCurrentVideoIndex(randomIndex);

    localStorage.setItem("currentVideoIndex", randomIndex.toString());
  };

  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.showPreview();
    }
  };
  const handleSeeking = () => {
    setIsThumbnail("");
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime());
    }
  };

  return (
    <>
      <ToastContainer
        className="bg-transparent"
        autoClose={1500}
        draggable
        closeOnClick
      />
      <section className="bg-transparent flex gap-2 flex-col justify-center items-center mt-8">
        <h1 className="animate-text text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-2xl font-black md:text-4xl">
          AI. Audio Player Presented By Planet Q Productions
        </h1>

        <div className="bg-transparent w-full h-auto flex justify-center items-center mb-2">
          <ReactPlayer
            ref={playerRef}
            className="bg-transparent"
            url={
              isVideoLink.length > 0
                ? isVideoLink[currentVideoIndex].link
                : "https://youtu.be/I5uiP9ogijs?si=O33QCOnUKp-Y7eHG"
            }
            controls={false}
            light={isThumbnail.length ? isThumbnail : "/images/client.png"}
            pip={true}
            loop={!isVideoLink.length > 0 ? true : false}
            playing={true}
            onPause={handlePause}
            onSeek={handleSeeking}
            stopOnUnmount={false}
            playIcon={
              <Image
                src="/images/client.png"
                alt="Your Logo"
                width={50}
                height={120}
                className="bg-transparent w-auto h-auto shadow-2xl opacity-95 transition-transform duration-200 ease-in-out transform-gpu hover:scale-125 hover:delay-100 hover:opacity-100"
                style={{
                  clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
                }}
              ></Image>
            }
            onEnded={handleVideoEnd}
          />
          <source src={isVideoLink} type="video/mp4" />
        </div>
      </section>
    </>
  );
}
