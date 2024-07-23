import React, { useState, useEffect } from 'react';
import HeadingBlue25px from '../shared/HeadingBlue25px';
import InputField from '../shared/InputField';
import { GoPlus } from 'react-icons/go';
import Button from '../shared/button';
import HeadingLg from '../shared/HeadingLg';
import { IoTrashSharp } from "react-icons/io5";
import ParagraphLg from '../shared/ParagraphLg';

const Step3 = ({ formData, setFormData }) => {
  const [newObserver, setNewObserver] = useState({ name: '', email: '' });

  const addObserver = () => {
    setFormData({
      ...formData,
      observers: [...formData.observers, newObserver],
    });
    setNewObserver({ name: '', email: '' });
  };

  const updateNewObserver = (field, value) => {
    setNewObserver({ ...newObserver, [field]: value });
  };

  const removeObserver = (index) => {
    const updatedObservers = formData.Observers.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, Observers: updatedObservers });
  };

  return (
    <div>
      <HeadingBlue25px children="Observers" />
      {/* Form container div */}
      <div className="pt-5 w-full space-y-3">
        <div className="w-full">
          <div className="flex justify-start items-center gap-5 w-full">
            <div className="w-full">
              <InputField
                label="Name"
                type="text"
                value={newObserver.name}
                onChange={(e) =>
                  updateNewObserver('name', e.target.value)
                }
              />
            </div>
            <div className="w-full">
              <InputField
                label="Email"
                type="email"
                value={newObserver.email}
                onChange={(e) =>
                  updateNewObserver('email', e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="save"
              children="Add New"
              className="py-1 px-5 shadow-[0px_3px_6px_#09828F69] rounded-xl"
              onClick={addObserver}
              icon={<GoPlus />}
            />
          </div>
        </div>
      </div>
      {/* Observer list div */}
      <div className='pt-5'>
        <HeadingLg children="Observer List" />
        <div className="border-[0.5px] border-solid border-custom-dark-blue-1 rounded-xl h-[300px] overflow-y-scroll mt-2">
          {/* table heading */}
          <div className="flex justify-start items-center py-3 px-5 shadow-sm">
            <div className="w-[30%]">
              <HeadingLg children="Name" />
            </div>
            <div className="w-[70%]">
              <HeadingLg children="Email" />
            </div>
          </div>
          {/* table item */}
          {formData.observers.map((observer, index) => (
            <div className="flex justify-start items-center py-3 px-5 shadow-sm" key={index}>
              <div className="w-[30%]">
                <ParagraphLg children={observer.name} />
              </div>
              <div className="w-[65%]">
                <ParagraphLg children={observer.email} />
              </div>
              <div className="w-[5%] flex justify-end">
                <IoTrashSharp className='bg-custom-orange-1 text-white p-2 text-3xl rounded-xl cursor-pointer' onClick={() => removeObserver(index)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step3;