import {
  faCloudArrowDown,
  faExpand,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFile } from 'api';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { useQuery } from 'react-query';

export const FileSection = ({
  title,
  content,
}: {
  title: string;
  content: string | number;
}) => {
  return (
    <div className="flex items-start space-x-2">
      <h5 className="font-extrabold whitespace-nowrap capitalize">
        {title} :
      </h5>
      <p>{content}</p>
    </div>
  );
};

export const ServeFile = ({
  id,
  size,
}: {
  id: string;
  size: number;
}) => {
  const [progress, setProgress] =
    useState<number>(0);
  const [finished, setFinished] =
    useState<boolean>(false);
  useEffect(() => {
    setFinished(false);
    setProgress(0);
  }, [id]);
  useQuery(['served-file', id], () => {
    getFile(id, setProgress, size).then((res) => {
      const target =
        document.querySelector<HTMLImageElement>(
          '#target',
        );
      const downlaodLink =
        document.querySelector<HTMLAnchorElement>(
          '#download-link',
        );
      if (target && downlaodLink) {
        target.src =
          window.URL.createObjectURL(res);
        downlaodLink.href =
          window.URL.createObjectURL(res);
        downlaodLink.setAttribute(
          'download',
          'image.png',
        );
        setFinished(true);
      }
    });
  });
  return (
    <div className="flex justify-center max-h-72 overflow-hidden relative">
      {!finished && (
        <div
          className="radial-progress"
          // @ts-ignore
          style={{ '--value': progress }}
        >
          {progress} %
        </div>
      )}
      {
        <img
          id="target"
          className={
            'object-cover' +
            (finished ? '' : ' hidden')
          }
        />
      }
      <div className="absolute bottom-1 right-1">
        <div
          className="tooltip tooltip-left"
          data-tip="full screen"
        >
          <span className=" btn btn-square btn-sm">
            <FontAwesomeIcon icon={faExpand} />
          </span>
        </div>
      </div>
      <div className="absolute top-1 right-1">
        <div
          className="tooltip tooltip-left"
          data-tip="download"
        >
          <a
            id="download-link"
            className="btn btn-sm btn-square"
          >
            <FontAwesomeIcon
              icon={faCloudArrowDown}
            />
          </a>
        </div>
      </div>
    </div>
  );
};
