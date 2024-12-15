import React, { useState } from 'react';
import Showcase from './showcase'; 
import Stats from './stats';

export default function ProfileBottom() {
  return (
    <div className='space-y-10'>
      <div className="tabs space-x-3 flex justify-center font-bold">
        <button
          className={`tab-button ${activeTab === 'showcase' ? 'underline decoration-purple-800 decoration-4 underline-offset-8' : ''}`}
          onClick={() => handleTabChange('showcase')}
        >
          Showcase
        </button>
        <button
          className={`tab-button ${activeTab === 'stats' ? 'underline decoration-purple-800 decoration-4 underline-offset-8' : ''}`}
          onClick={() => handleTabChange('stats')}
        >
          Stats
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'showcase' && <Showcase />}
        {activeTab === 'stats' && <Stats />}
      </div>
    </div>
  );
}