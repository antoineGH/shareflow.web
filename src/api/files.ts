import { HttpResponseError } from 'helpers/errors'
import { rest } from 'helpers/rest'
import type {
  DeleteFileReturnType,
  File,
  FileApi,
  FileData,
  FileDataApi,
  GetFilesReturnType,
  PatchFileData,
  PatchFileDataApi,
  PatchFileReturnType,
  PostFileData,
  PostFileDataApi,
  PostFileReturnType,
  PutFileData,
  PutFileDataApi,
  PutFileReturnType,
} from 'types/files'

import { DELETE_FILE, GET_FILES, PATCH_FILE, POST_FILE, PUT_FILE } from './urls'
import { convertObjectKeys, formatURL } from './utils'

const errGetFilesMsg = 'An error occurred while getting files. Please try again'

async function getFiles(
  userId: number,
  signal?: AbortSignal,
): Promise<GetFilesReturnType> {
  try {
    const url = formatURL(`${GET_FILES}`, { userId })
    const res = await rest.get({ url, signal })
    if (res?.response?.status !== 200) {
      throw new HttpResponseError(res?.response?.status ?? null, errGetFilesMsg)
    }

    const { object } = res
    const filesData = convertObjectKeys<FileDataApi, FileData>(object)
    return { filesData }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const errPostFileMsg =
  'An error occurred while creating the file. Please try again'

async function postFile(
  userId: number,
  newFile: Omit<File, 'id'>,
  signal?: AbortSignal,
): Promise<PostFileReturnType> {
  try {
    const url = formatURL(`${POST_FILE}`, { userId })
    const body = JSON.stringify(newFile)

    const res = await rest.post({ url, body, signal })

    if (res?.response?.status !== 201) {
      throw new HttpResponseError(res?.response?.status ?? null, errPostFileMsg)
    }

    const { object } = res
    const fileData = convertObjectKeys<PostFileDataApi, PostFileData>(object)
    return { fileData }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const errPutFileMsg =
  'An error occurred while updating the file. Please try again'

async function putFile(
  userId: number,
  fileId: number,
  updatedFile: File,
  signal?: AbortSignal,
): Promise<PutFileReturnType> {
  try {
    const url = formatURL(`${PUT_FILE}`, { userId, fileId })
    const body = JSON.stringify(updatedFile)

    const res = await rest.put({ url, body, signal })

    if (res?.response?.status !== 204) {
      throw new HttpResponseError(res?.response?.status ?? null, errPutFileMsg)
    }

    const { object } = res
    const file = convertObjectKeys<FileApi, File>(object)
    return { file }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const errPatchFileMsg =
  'An error occurred while updating the file. Please try again'

async function patchFile(
  userId: number,
  fileId: number,
  updates: Partial<File>,
  signal?: AbortSignal,
): Promise<PatchFileReturnType> {
  try {
    const url = formatURL(`${PATCH_FILE}`, { userId, fileId })
    const updatesApi = convertObjectKeys<Partial<File>, Partial<FileApi>>(
      updates,
      'snakeCase',
    )
    const body = JSON.stringify(updatesApi)

    const res = await rest.patch({ url, body, signal })

    if (res?.response?.status !== 201) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        errPatchFileMsg,
      )
    }

    const { object } = res
    const file = convertObjectKeys<FileApi, File>(object)
    console.log('file API', file)
    return { file }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const errDeleteFileMsg =
  'An error occurred while deleting the file. Please try again'

async function deleteFile(
  userId: number,
  fileId: number,
  signal?: AbortSignal,
): Promise<DeleteFileReturnType> {
  try {
    const url = formatURL(`${DELETE_FILE}`, { userId, fileId })
    const res = await rest.delete({ url, signal })

    if (res?.response?.status !== 204) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        errDeleteFileMsg,
      )
    }
    return { fileId: fileId }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export { getFiles, postFile, putFile, patchFile, deleteFile }
