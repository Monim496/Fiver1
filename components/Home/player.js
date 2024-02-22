"use client";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import Image from "next/image";

export default function Player() {
  const videoLinkInputRef = useRef();
  const [fileError, setFileError] = useState("");
  const [isVideoLink, setIsVideoLink] = useState("");
  const [isThumbnail, setIsThumbnail] = useState("");
  const playerRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredVideoLink = videoLinkInputRef.current.value;
    setIsVideoLink(enteredVideoLink);
    event.target.reset();
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

  function converttobase64(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/jpg" ||
        selectedFile.type === "image/gif"
      ) {
        setFileError("");
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onload = () => {
          setIsThumbnail("");
          setIsThumbnail(reader.result);
        };

        reader.onerror = () => {
          console.log("Error reading the file");
        };
      } else {
        setFileError(
          "Invalid file type. Please select a PNG or JPEG/JPG or GIF file."
        );
      }
    }
  }

  return (
    <>
      <section className="bg-transparent flex gap-4 flex-col lg:flex-row justify-center pb-6">
        <div className="bg-transparent flex flex-col gap-6">
          <form
            className="bg-transparent flex flex-col gap-2 justify-center items-center"
            onSubmit={submitHandler}
          >
            <label
              htmlFor="email"
              className="block bg-transparent text-xs font-bold leading-6 text-indigo-300  relative group"
              data-tooltip-target="tooltip-right"
              data-tooltip-placement="right"
            >
              Please insert the link here.
              <span className="absolute text-center w-full top-full left-full transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                YouTube, SoundCloud, Facebook, Vimeo, Wistia, Mixcloud,
                Dailymotion, and Twitch here.
              </span>
            </label>
            <div className="bg-transparent">
              <input
                id="link"
                name="link"
                type="text"
                autoComplete="email"
                required
                ref={videoLinkInputRef}
                className="block bg-transparent w-72 rounded-full border-0 px-4 py-0.5 text-gray-300 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <button
              type="submit"
              className="flex justify-center w-20 rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Play
            </button>
          </form>
          <div className="bg-transparent flex flex-col justify-center items-center mx-4">
            <label
              htmlFor="cover-photo"
              className="block bg-transparent text-xs font-bold leading-6 text-indigo-300"
            >
              Switch the thumbnail picture with an upload here
            </label>
            <div className="mt-2 py-2 bg-transparent flex justify-center rounded-lg border border-dashed border-indigo-600 px-20">
              <div className="text-center bg-transparent">
                <svg
                  className="mx-auto bg-transparent h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    className="bg-transparent"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="mt-4 flex bg-transparent justify-center items-center text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative px-2 bg-transparent cursor-pointer rounded-md bg-gray-300 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span className="bg-transparent">Upload a picture/gif</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="bg-transparent sr-only"
                      onChange={converttobase64}
                    ></input>
                  </label>
                  <p className="pl-1 bg-transparent font-bold text-xs text-indigo-600">
                    or drag and drop
                  </p>
                </div>
                <p className="text-xs bg-transparent font-bold leading-5 text-indigo-600">
                  PNG, JPG/JPEG, GIF up to 10MB
                </p>
              </div>
            </div>
            {fileError && (
              <div
                style={{
                  textAlign: "center",
                  color: "red",
                  fontSize: "0.75rem",
                  marginTop: "0.5rem",
                }}
              >
                {fileError}
              </div>
            )}
          </div>
        </div>
        <div className="bg-transparent flex justify-center items-center">
          <ReactPlayer
            ref={playerRef}
            className="bg-transparent"
            width="700px"
            height="350px"
            url={isVideoLink ? isVideoLink : "https://youtu.be/0xA_FVrvnRg"}
            controls={!isVideoLink ? false : true}
            playing={true}
            light={isThumbnail ? isThumbnail : "/images/client.png"}
            pip={true}
            onPause={handlePause}
            onSeek={handleSeeking}
            stopOnUnmount={false}
            loop={true}
            playIcon={
              <Image
                src="/images/client.png"
                alt="Your Logo"
                width={50}
                height={120}
                className="rounded-full bg-transparent"
              ></Image>
            }
          />
          <source src={isVideoLink} type="video/mp4" />
        </div>
      </section>
    </>
  );
}
