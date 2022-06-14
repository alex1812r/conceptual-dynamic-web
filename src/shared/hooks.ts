import { useState, useEffect, useMemo, useCallback } from 'react';
import { Client, init, PickerOptions, PickerFileMetadata } from 'filestack-js';
import { FILESTACK_API_KEY } from './constants';

export interface UseFilestackHook {
  pick: (handleOnUploadDone?: (files: PickerFileMetadata[]) => void) => void;
  isLoading: boolean;
  files?: PickerFileMetadata[];
}

export interface UserFilesStackProps {
  maxFiles?: number;
  accept?: string | string[];
}

export const useFilestack = (
  props: UserFilesStackProps = { maxFiles: 1 },
): UseFilestackHook => {
  const { maxFiles, accept } = props;
  const [client, setClient] = useState<Client>();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<PickerFileMetadata[]>();

  const pickerOptions = useMemo(() => {
    const options: PickerOptions = {
      fromSources: [
        'local_file_system',
        'instagram',
        'facebook',
        'googledrive',
        'dropbox',
        'onedrive',
      ],
      accept,
      maxFiles,
    };
    return options;
  }, [maxFiles, accept]);

  useEffect(() => {
    const clientOptions = {};
    setClient(init(FILESTACK_API_KEY, clientOptions));
  }, []);

  const pick = useCallback(
    async (handleOnUploadDone: any) => {
      setIsLoading(true);
      client
        ?.picker({
          ...pickerOptions,
          /**
           *
           * @param res -.
           */
          onUploadDone: (res) => {
            setIsLoading(false);
            setUploadFiles(res.filesUploaded);
            if (handleOnUploadDone && res.filesUploaded.length)
              handleOnUploadDone(res.filesUploaded);
          },
        })
        .open();
    },
    [client, pickerOptions],
  );

  return { pick, isLoading, files: uploadFiles };
};
