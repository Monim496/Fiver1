import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MusicPlayer(initialVideoLink) {
  const [isVideoLink, setIsVideoLink] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isThumbnail, setIsThumbnail] = useState("");
  const [isLoop, setIsLoop] = useState(false);
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
          toast.success("New Thumbnail is added", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setIsThumbnail(newthumbnail[0].ThumbnailImage);
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
  }, []);

  const handleVideoEnd = () => {
    if (currentVideoIndex === isVideoLink.length - 1) {
      setCurrentVideoIndex(0);
    } else {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
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

  const toggleLoopToTrue = () => {
    setIsLoop(true);
  };
  const toggleLoopToFalse = () => {
    setIsLoop(false);
  };

  return (
    <>
      <ToastContainer
        className="bg-transparent"
        autoClose={1500}
        draggable
        closeOnClick
      />
      <section className="bg-transparent flex gap-2 flex-col justify-center items-center">
        <div className="bg-transparent">
          <h1 className="bg-transparent text-indigo-600 text-center uppercase font-bold text-xl">
            MusicPlayer presented by Planet Q Production
          </h1>
          <div className="bg-transparent flex gap-4 justify-center items-center">
            <button
              onClick={toggleLoopToTrue}
              disabled={isLoop}
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm uppercase font-semibold py-2 px-4 border border-blue-700 rounded-full disabled:bg-blue-950"
            >
              Loop current video
            </button>
            <button
              onClick={toggleLoopToFalse}
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm uppercase font-semibold py-2 px-4 border border-blue-700 rounded-full"
            >
              UnLoop
            </button>
          </div>
        </div>

        <div className="bg-transparent w-full h-auto flex justify-center items-center mb-2">
          <ReactPlayer
            ref={playerRef}
            className="bg-transparent"
            // width="700px"
            // height="350px"
            url={
              isVideoLink.length > 0
                ? isVideoLink[currentVideoIndex].link
                : "https://youtu.be/0xA_FVrvnRg"
            }
            controls={isVideoLink.length > 0 ? true : false}
            light={isThumbnail ? isThumbnail : "/images/client.png"}
            pip={true}
            loop={isVideoLink.length > 0 ? isLoop : true}
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
                className="rounded-full bg-transparent"
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
