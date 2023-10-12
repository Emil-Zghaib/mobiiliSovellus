import {useEffect, useState} from 'react';
import {apiUrl} from '../utils/app-config';
import {doFetch} from '../utils/functions';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const json = await doFetch(apiUrl + 'media');
      const mediaFiles = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(apiUrl + 'media/' + item.file_id);
          const fileData = await response.json();
          return fileData;
        }),
      );
      setMediaArray(mediaFiles);
    } catch (error) {
      console.error('loadMedia failed', error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return {mediaArray};
};

export {useMedia};
