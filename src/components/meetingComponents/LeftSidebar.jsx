"use client";
import React, { useEffect, useRef, useState } from "react";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
import userImage from "../../../public/user.jpg";
import groupChatImage from "../../../public/group-chat.png";
import LeftSidebarOpenUi from "./LeftSidebarOpenUi";
import LeftSidebarCloseUi from "./LeftSidebarCloseUi";

const LeftSidebar = ({
  users,
  setUsers,
  role,
  isWhiteBoardOpen,
  setIsWhiteBoardOpen,
  isRecordingOpen,
  setIsRecordingOpen,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("participantList");
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isWaiting, setIsWaiting] = useState([
    {
      name: "Brendan Steven",
      image: userImage,
    },
    {
      name: "Mark Berg",
      image: userImage,
    },
  ]);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedChat(null);
  };

  const chatParticipants = [
    {
      id: 1,
      name: "Group Chat",
      image: groupChatImage,
      messagePreview: "Johnny Silver: Good morning!",
      time: "9:31",
      unreadCount: 4,
      type: "group",
      messages: [
        { sender: "Johnny Silver", content: "Good morning!", time: "9:30 PM" },
        {
          sender: "Rebecca Nitin",
          content: "Always fun to follow up",
          time: "9:31 PM",
        },
        {
          sender: "Raina Smith",
          content: "Always fun to follow up on the question by watching",
          time: "9:31 PM",
        },
      ],
    },
    {
      id: 2,
      name: "Victoria Armstrong",
      image: userImage,
      messagePreview: "Always fun to follow up",
      time: "9:31",
      unreadCount: 1,
      type: "individual",
      messages: [
        {
          sender: "Victoria Armstrong",
          content: "Always fun to follow up",
          time: "9:31 PM",
        },
      ],
    },
    {
      id: 3,
      name: "Raina Smith",
      image: userImage,
      messagePreview: "Always fun to follow up",
      time: "9:31",
      unreadCount: 1,
      type: "individual",
      messages: [
        {
          sender: "Raina Smith",
          content: "Always fun to follow up",
          time: "9:31 PM",
        },
      ],
    },
    {
      id: 4,
      name: "Rebecca Nitin",
      image: userImage,
      messagePreview: "Always fun to follow up",
      time: "9:30",
      unreadCount: 0,
      type: "individual",
      messages: [
        {
          sender: "Rebecca Nitin",
          content: "Always fun to follow up",
          time: "9:31 PM",
        },
        { sender: "Johnny Silver", content: "Good morning!", time: "9:30 PM" },
      ],
    },
  ];
  const toggleModal = (event, user) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top, left });
    setCurrentUser(user);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const toggleWhiteBoard = () => {
    setIsWhiteBoardOpen(!isWhiteBoardOpen);
  };

  const toggleRecordingButton = () => {
    setIsRecordingOpen(!isRecordingOpen)
  }

  return (
    <div
      className={`flex ${
        isSidebarOpen ? "w-80" : "w-24"
      } transition-width duration-300 bg-white h-screen rounded-r-xl relative`}
    >
      {isSidebarOpen ? (
        <LuArrowLeftToLine
          className="absolute top-4 right-2 text-black text-sm cursor-pointer "
          onClick={toggleSidebar}
        />
      ) : (
        <LuArrowRightToLine
          className="absolute top-4 right-2 text-black text-sm cursor-pointer "
          onClick={toggleSidebar}
        />
      )}

      <div className="flex flex-col w-full ">
        {/*  */}
        {isSidebarOpen ? (
          // If side bar open
          <LeftSidebarOpenUi
            users={users}
            setUsers={setUsers}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            isWaiting={isWaiting}
            setIsWaiting={setIsWaiting}
            handleTabClick={handleTabClick}
            chatParticipants={chatParticipants}
            role={role}
            toggleWhiteBoard={toggleWhiteBoard}
            toggleRecordingButton={toggleRecordingButton}
          />
        ) : (
          <LeftSidebarCloseUi
            users={users}
            setUsers={setUsers}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            isWaiting={isWaiting}
            setIsWaiting={setIsWaiting}
            handleTabClick={handleTabClick}
            chatParticipants={chatParticipants}
            role={role}
            toggleWhiteBoard={toggleWhiteBoard}
            toggleRecordingButton={toggleRecordingButton}
          />
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
