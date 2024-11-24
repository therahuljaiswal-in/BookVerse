import React from "react";

const BookBanner = () => {
  return (
    <div className="w-full lg:h-[45vh] md:[30vh] flex items-center justify-center bg-zinc-900 p-4">
        <div className="flex flex-col gap-4 justify-center items-center ">
            <h1 className="lg:text-6xl text-2xl md:text-4xl text-center font-serif font-semibold text-yellow-300">More Than a Bookstore</h1>
            <p className=" lg:text-4xl md:text-3xl text-xl text-center font-serif text-yellow-100">"A heaven for readers and dreamers."</p>
        </div>
       
    </div>
  );
};

export default BookBanner;
