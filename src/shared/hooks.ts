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

export interface PaginationProps {
  page?: number;
  perPage?: number;
}

export type PaginationType = {
  page: number;
  setPage: (n: number) => void;
  perPage: number;
  setPerPage: (n: number) => void;
  totalPages: number;
  setItemsCount: (n: number) => void;
};

export function usePagination(
  props: PaginationProps = {},
): PaginationType {
  const [page, setPage] = useState(props.page || 1);
  const [perPage, setPerPage] = useState(props.perPage || 20);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(itemsCount / perPage));
  }, [perPage, itemsCount]);

  return {
    page,
    setPage,
    perPage,
    setPerPage,
    totalPages,
    setItemsCount,
  };
}