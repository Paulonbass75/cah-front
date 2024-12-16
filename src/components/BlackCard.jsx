import React from "react";

const BlackCard = ({ card }) => {
  const title = typeof card === "string" ? card : card.title;
  const content = typeof card === "string" ? "" : card.content;

  console.log("Rendering black card:", { title, content }); // Debugging log

  return (
    <div className="w-32 h-48 border border-gray-400 rounded-lg shadow-lg flex flex-col justify-center items-center bg-black text-white text-center p-2 m-2 overflow-hidden">
      <div className="text-xl font-bold break-words overflow-hidden text-ellipsis">
        {title}
      </div>
      <div className="text-sm break-words overflow-hidden text-ellipsis">
        {content}
      </div>
    </div>
  );
};

export default BlackCard;
