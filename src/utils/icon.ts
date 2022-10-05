import {
  faFileAudio,
  faFileCircleQuestion,
  faFileImage,
  faFileVideo,
} from '@fortawesome/free-solid-svg-icons';
import { MIMES } from 'constants/index';

export const determineIcon = (type: string) => {
  switch (type) {
    case MIMES.IMAGE:
      return faFileImage;
    case MIMES.AUDIO:
      return faFileAudio;
    case MIMES.VIDEO:
      return faFileVideo;
    default:
      return faFileCircleQuestion;
  }
};
