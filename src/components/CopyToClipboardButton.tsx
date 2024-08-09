import { useState } from 'react';
import copy from 'clipboard-copy';
import {copyToClipBoardSVG} from '../assets/index'

const CopyToClipboardButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000)
    } catch (error) {
      console.error('Failed to copy text to clipboard', error);
    }
  };

  return (
    <div className='copy-btn'>
      <button onClick={handleCopyClick} type="button" className="border-transparent focus:border-transparent focus:ring-0 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm p-3  text-center me-2 mb-2">
        {isCopied ? 'Copied!' : copyToClipBoardSVG()}
      </button>
    </div>
  );
};

export default CopyToClipboardButton;