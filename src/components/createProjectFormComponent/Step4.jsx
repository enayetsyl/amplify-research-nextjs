import React, { useState } from 'react';
import HeadingBlue25px from '../shared/HeadingBlue25px';
import { GoPlus } from 'react-icons/go';
import Button from '../shared/Button';
import BreakoutRoomModal from '../singleComponent/BreakoutRoomModal';
import { IoTrashSharp } from 'react-icons/io5';
import HeadingLg from '../shared/HeadingLg';
import { RiPencilFill } from 'react-icons/ri'
import ParagraphLg from '../shared/ParagraphLg';

const Step4 = ({ formData, setFormData }) => {
  const [isBreakoutRoomModalOpen, setIsBreakoutRoomModalOpen] = useState(false);

  const handleOpenBreakoutModal = () => {
    setIsBreakoutRoomModalOpen(true);
  };
  const handleCloseBreakoutModal = () => {
    setIsBreakoutRoomModalOpen(false);
  };

  const removeBreakoutRoom = (index) => {
    const updatedBreakoutRooms = formData.breakoutRooms.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, breakoutRooms: updatedBreakoutRooms });
  };

  const editBreakoutRoom = (index) => { 
    //write edit logic
   }

  return (
    <div>
      <HeadingBlue25px children="Breakout Rooms" />
      <div className="flex justify-end">
        <Button
          type="button"
          variant="save"
          children="Add New"
          className="py-1 px-5 shadow-[0px_3px_6px_#09828F69] rounded-xl"
          icon={<GoPlus />}
          onClick={handleOpenBreakoutModal}
        />
      </div>
      <div className="flex justify-stat items-center px-3">
        <div className='w-[25%]'> 
          <HeadingLg children="Name" />
        </div>
        <div className='w-[20%]'>
          <HeadingLg children="Participants" />
        </div>
        <div className='w-[55%]'>
          <HeadingLg children="Interpreter" />
        </div>
      </div>
      {formData.breakoutRooms.map((room, index) => (
        <div key={index} className="py-3">
          <div className="flex justify-start items-center bg-white rounded-xl shadow-[0px_0px_6px_#00000029] p-3">
            <ParagraphLg className='w-[25%]'>{room.name}</ParagraphLg>
            <ParagraphLg className='w-[20%]'>{room.participants.length}</ParagraphLg>
            <ParagraphLg className='w-[50%]'>{room.interpreterName}</ParagraphLg>
            <div className="flex justify-end space-x-2 className='w-[5%]'">
              <button onClick={() => editBreakoutRoom(index)}>
                <RiPencilFill className='bg-custom-teal text-white p-2 text-3xl rounded-xl cursor-pointer' />
              </button>
              <button onClick={() => removeBreakoutRoom(index)}>
                <IoTrashSharp className=' bg-custom-orange-1 text-white p-2 text-3xl rounded-xl cursor-pointer' />
              </button>
            </div>
          </div>
        </div>
      ))}
      {isBreakoutRoomModalOpen && (
        <BreakoutRoomModal
          onClose={handleCloseBreakoutModal}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default Step4;