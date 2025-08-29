import React, { ReactNode } from "react";

function Modal({
  title,
  handleClose,
  children,
  size,
}: {
  title: string;
  children: ReactNode;
  handleClose: () => void;
  size?: { h: string; w: string };
}) {
  return (
    <div className="w-[100vw] h-[100vh] absolute top-0 left-0 z-10 grid place-items-center">
      <div
        className="w-[100vw] h-[100vh] bg-black opacity-25 absolute top-0 left-0  z-20"
        onClick={handleClose}
      ></div>
      <div
        className={`${size ? size.w : "w-[80%] sm:w-[50%] "}
        ${
          size ? size.h : "h-[60%] sm:h-[70%] "
        } h-[70%] bg-gray-300 z-50 py-8 px-10 rounded-xl text-black`}
      >
        <h2 className="text-2xl font-bold mb-8 text-black">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Modal;
