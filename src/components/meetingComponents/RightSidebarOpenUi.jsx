import React, { useEffect, useRef, useState } from "react";
import Button from "../shared/button";
import Image from "next/image";
import { LuClipboardSignature } from "react-icons/lu";
import { FaFolder, FaTrash, FaVideo } from "react-icons/fa";
import {
  BsChatSquareDotsFill,
  BsChatSquareFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import HeadingLg from "../shared/HeadingLg";
import Search from "../singleComponent/Search";
import { IoIosDocument, IoMdMic } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import userImage from "../../../public/user.jpg";
import groupChatImage from "../../../public/group-chat.png";
import { IoClose, IoRemoveCircle, IoSend } from "react-icons/io5";
import { MdInsertEmoticon, MdMoveDown } from "react-icons/md";
import RemoveUserModal from "../singleComponent/RemoveUserModal";
import MoveToWaitingRoomModal from "../singleComponent/MoveToWaitingRoomModal";

const RightSidebarOpenUi = ({
  observers,
  setObservers,
  activeTab,
  setActiveTab,
  currentObserver,
  setCurrentObserver,
  selectedChat,
  setSelectedChat,
  isWaiting,
  setIsWaiting,
  handleTabClick,
  chatParticipants,
  files,
  handleSearch
}) => {


  return (
    <>
      {/* Backroom chat and icon */}
      <div className="flex justify-center items-center gap-2 pt-10  lg:pb-4 mx-4">
        <BsChatSquareFill className="text-custom-dark-blue-1" />
        <h2 className=" uppercase  font-bold">backroom chat</h2>
        <div className="bg-custom-black flex justify-center items-center gap-1 px-2 py-1 rounded-xl">
          <FaEye className="text-custom-orange-1" />
          <p className="text-xs text-white">Viewers</p>
          <p className="text-xs text-white">{observers.length}</p>
        </div>
      </div>

      {/* chat container */}
      <div className="flex flex-col flex-grow px-4 pb-2 pt-4 bg-custom-gray-8 mb-4 rounded-xl overflow-y-auto mx-4">
        {/* tabs */}
        <div className="flex justify-center items-center gap-2 pb-2 ">
          <Button
            children="Observers List"
            variant="default"
            type="submit"
            className={`w-full py-2 rounded-xl pl-2  text-[10px] text-center px-1  ${
              activeTab === "observersList"
                ? "shadow-[0px_4px_6px_#1E656D4D]"
                : "bg-custom-gray-8 border-2  border-custom-teal !text-custom-teal "
            }  `}
            onClick={() => handleTabClick("observersList")}
          />
          <div className="w-full relative">
            <Button
              children="Observers Chat"
              variant="default"
              type="submit"
              className={`w-full py-2 rounded-xl pl-2  text-[10px] text-center px-1  ${
                activeTab === "observersChat"
                  ? "shadow-[0px_4px_6px_#1E656D4D]"
                  : "bg-custom-gray-8 border-2  border-custom-teal !text-custom-teal "
              }  `}
              onClick={() => handleTabClick("observersChat")}
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-lg bg-[#ff2b2b] shadow-[0px_1px_3px_#00000036]"></div>
          </div>
        </div>

        {/* observers container */}

        {/* observers list */}
        {activeTab === "observersList" && (
          <div className="flex-grow pt-2">
            <Search
              placeholder="Search Name"
              onSearch={handleSearch}
              inputClassName="!bg-[#F3F4F5] !rounded-xl "
              iconClassName="!bg-[#EBEBEB]"
            />
            {/* participant continer */}
            {observers?.map((observer) => (
              <div
                className="flex justify-center items-center gap-2 py-1"
                key={observer.id}
              >
                <Image
                  src={observer.image}
                  alt="observer image"
                  height={40}
                  width={40}
                  className="rounded-2xl border-[3px] border-white border-solid"
                />
                <p className="text-[#1a1a1a] text-[10px] flex-grow">
                  {observer.name}
                </p>

                <BsChatSquareDotsFill />
              </div>
            ))}
          </div>
        )}

        {/* observers chat */}
        {activeTab === "observersChat" &&
          !selectedChat &&
          chatParticipants.map((chat) => (
            <div
              key={chat.id}
              className="bg-custom-gray-2 p-2 flex justify-center items-center gap-2 border-b border-solid border-custom-gray-1 cursor-pointer"
              onClick={() => setSelectedChat(chat)}
            >
              <Image
                src={chat.image}
                alt="chat-user-image"
                height={40}
                width={40}
                className="rounded-[50%]"
              />
              <div className="flex-grow-1 text-xs ">
                <p className="pb-1 font-bold">{chat.name}</p>
                <p className={`${chat.unreadCount > 0 ? "font-bold" : ""}`}>
                  {chat.messagePreview}
                </p>
              </div>
              <div className="flex flex-col justify-end items-end text-xs">
                <p className="pb-1">{chat.time}</p>
                {chat.unreadCount > 0 && (
                  <p className="py-0.5 px-1.5 text-white bg-[#ff2b2b] rounded-[50%]">
                    {chat.unreadCount}
                  </p>
                )}
              </div>
            </div>
          ))}

        {activeTab === "observersChat" && selectedChat && (
          <div className="flex-grow pt-2  rounded-xl flex flex-col justify-center items-center">
            {/* chat name and image */}
            <div className="flex w-full items-center justify-center gap-2 mb-4 bg-custom-gray-4 p-2">
              <Image
                src={selectedChat.image}
                alt="chat-user-image"
                height={30}
                width={30}
                className="rounded-[50%]"
              />
              <p className="text-[#1a1a1a] text-[12px] font-bold flex-1">
                {selectedChat.name}
              </p>
              <IoClose
                className="text-custom-black cursor-pointer"
                onClick={() => setSelectedChat(null)}
              />
            </div>
            {/* chat message */}
            <div className="flex flex-col gap-2 flex-grow">
              {selectedChat.messages.map((message, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2"
                >
                  <p className="text-[#1a1a1a] text-[12px] f">
                    <span className="font-bold">{message.sender}:</span>{" "}
                    {message.content}
                  </p>
                  <p className="text-[#1a1a1a] text-[10px] text-end">
                    {message.time}
                  </p>
                </div>
              ))}
            </div>
            {/* send message */}
            <div className="flex justify-between items-center gap-2 relative">
              <input
                type="text"
                placeholder="Type Message"
                className="rounded-lg py-1 px-2 placeholder:text-[10px]"
              />
              <div className="absolute right-11 cursor-pointer">
                <MdInsertEmoticon />
              </div>
              <div className="py-1.5 px-1.5 bg-custom-orange-2 rounded-[50%] text-white cursor-pointer text-sm">
                <IoSend />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        {/* heading */}
        <div className="flex justify-center items-center gap-2 px-4 pb-2 ">
          <IoIosDocument className="text-custom-dark-blue-1text-lg" />
          <h1 className="uppercase font-bold flex-1 text-custom-dark-blue-2">
            document hub
          </h1>
          <Button
            children="Upload File"
            variant="primary"
            type="submit"
            className="bg-custom-orange-1 text-white rounded-xl py-1 px-3 text-xs"
          />
        </div>
        {/* Upload file div */}
        <div className="bg-custom-gray-8 rounded-xl mx-4 p-2 overflow-y-auto">
          {/* title */}
          <div className="flex justify-between items-center border-b border-solid border-custom-gray-3 pb-1">
            <p className="text-xs text-custom-gray-3">Name</p>
            <p className="text-xs text-custom-gray-3 mr-11">Size</p>
          </div>
          {/* files */}
          <div className="flex items-center justify-between bg-gray-200 py-3 rounded">
            <div className="flex items-center space-x-2">
              <FaFolder className="h-3 w-3 text-custom-gray-3" />
              <span className="text-xs  text-custom-gray-3">
                {files[0].name}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-custom-gray-3">
                {files[0].size}
              </span>
              <button className="text-red-600 hover:text-red-800">
                <FaTrash className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebarOpenUi;
