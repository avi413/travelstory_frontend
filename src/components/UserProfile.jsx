import React, { useState, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from '../utils/data';
import { client } from '../container/client';
import MasonaryLayout from './MasonryLayout';
import Spinner from './Spinner';

const reandomImg =
  'https://source.unsplash.com/1600x900/?nature,phtograpy,technology';
  
const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-prymary-500 mr-4 text-black font-bold p-2 rounded-full w-20';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created'); // Created || Saved
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();


  useEffect(() => {
    const quary = userQuery(userId);
    client.fetch(quary).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if(text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery)
      .then((data) => {
        setPins(data);
      })
    } else {
      const sevedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(sevedPinsQuery)
      .then((data) => {
        setPins(data);
      })
    }
  }, [text, userId ])
  const logOut = () => {
    googleLogout();
    localStorage.clear();
    navigate('/login');
  };
  if (!user) {
    return <Spinner message='Loading profile...' />;
  }
  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img
              src={reandomImg}
              className='w-full h-370 xl:h-510 shadow-lg object-cover'
              alt='banner-pic'
            />
            <img
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
              src={user.image}
              alt='user-profile'
            />
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user.userName}
            </h1>
            <div className='absolute top-0 z-1 right-1 p-2'>
              {' '}
              {userId === user._id && (
                <button className='bg-white p-3 rounded-full' onClick={logOut}>
                  <AiOutlineLogout color='red' fontSize={21} />
                </button>
              )}
            </div>
            <div className='text-center mb-7'>
              <button 
               type='button'
               onClick={(e) => {
                setText(e.target.textContent)
                setActiveBtn('created');
               }}
               className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
               
              >Created</button>
              <button 
               type='button'
               onClick={(e) => {
                setText(e.target.textContent)
                setActiveBtn('saved');
               }}
               className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
               
              >Saved</button>
            </div>
            
          </div>
          {pins?.length ? (
              <div className='px-2'>
              <MasonaryLayout 
              pins={pins}/>
            </div>
            ) : (
              <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>No pins Found!</div>
            )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
