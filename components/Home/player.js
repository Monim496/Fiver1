"use client";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";

export default function Player() {
  const videoLinkInputRef = useRef();
  const [isVideoLink, setIsVideoLink] = useState(
    "https://youtu.be/iM150ZWovZM?si=iLkHGMhOM0jSejFV"
  );

  let thumbnailpiclink =
    "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg";

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredVideoLink = videoLinkInputRef.current.value;
    setIsVideoLink(enteredVideoLink);
    event.target.reset();
  };

  return (
    <>
      <section className="bg-transparent text-white  flex flex-col justify-center items-center">
        <div className="bg-transparent flex justify-center items-center">
          <form className="bg-transparent" onSubmit={submitHandler}>
            <label
              htmlFor="email"
              className="block bg-transparent text-2xl text-center font-medium leading-6 text-white"
            >
              Paste link here
            </label>
            <div className="mt-2 bg-transparent">
              <input
                id="link"
                name="link"
                type="text"
                autoComplete="email"
                required
                ref={videoLinkInputRef}
                className="block bg-transparent w-72 rounded-md border-0 px-2 py-1.5 my-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <button
              type="submit"
              className="flex justify-center w-full rounded-md bg-indigo-600 px-3 py-1.5 my-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Play
            </button>
          </form>
        </div>

        <div>
          <ReactPlayer
            width="700px"
            height="350px"
            url={isVideoLink}
            controls={true}
            playing={true}
            light={thumbnailpiclink}
            pip={true}
            // playIcon={<img src="/images/play.gif" width={50} height={50}></img>}
            //playIcon Element or component to use as the play icon in light mode
            stopOnUnmount={false}
          />
          <source src={isVideoLink} type="video/mp4" />
        </div>
      </section>
    </>
  );
}

// const enteredVideoLink = videoLinkInputRef.current.value;

//   let videosrc =
//     "https://soundcloud.com/royalty-free-beats/royalty-free-rap-beat-dreaming-sad?si=07f50d5bd6104155bed64f43e85efee6&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing";
//let videosrc = "https://youtu.be/iM150ZWovZM?si=iLkHGMhOM0jSejFV";

// let videosrc = enteredVideoLink
//   ? enteredVideoLink
//   : "https://youtu.be/iM150ZWovZM?si=iLkHGMhOM0jSejFV";

// let thumbnailpiclink =
//   "https://user-images.githubusercontent.com/14011726/94132137-7d4fc100-fe7c-11ea-8512-69f90cb65e48.gif";
