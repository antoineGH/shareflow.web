import { HttpResponseError } from 'helpers/errors'
import { rest } from 'helpers/rest'
import type {
  DeleteFileReturnType,
  DeleteFilesReturnType,
  FileApi,
  FileData,
  FileDataApi,
  FileT,
  FileUpload,
  FolderUpload,
  FolderUploadApi,
  GetFilesReturnType,
  PatchFileReturnType,
  PostFileReturnType,
  PutFileReturnType,
  RestoreFilesReturnType,
} from 'types/files'
import { TagApi } from 'types/tags'
import { SnakeCaseToCamelCase } from 'types/utils'

import {
  DELETE_FILE,
  DELETE_FILES,
  GET_FILES,
  PATCH_FILE,
  PATCH_FILES,
  POST_FILE,
  POST_FOLDER,
  PUT_FILE,
} from './urls'
import { convertObjectKeys, formatURL, generateUrlParams } from './utils'

const errGetFilesMsg = 'An error occurred while getting files. Please try again'

async function getFiles(
  userId: number,
  filter: 'all_files' | 'is_deleted' | 'is_favorite',
  tags?: (SnakeCaseToCamelCase<TagApi> | string)[],
  signal?: AbortSignal,
): Promise<GetFilesReturnType> {
  try {
    let queries = generateUrlParams({
      [filter]: 1,
    })

    if (tags && tags.length > 0) {
      queries += '&tags=' + tags.join(',')
    }

    const baseUrl = formatURL(`${GET_FILES}`, { userId })
    const url = `${baseUrl}?${queries}`

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

const errPostFolderMsg =
  'An error occurred while creating the folder. Please try again'

async function postFolder(
  userId: number,
  newFolder: FileUpload,
  signal?: AbortSignal,
): Promise<PostFileReturnType> {
  try {
    const url = formatURL(`${POST_FOLDER}`, { userId })

    const newFolderApi = convertObjectKeys<FolderUpload, FolderUploadApi>(
      newFolder,
      'snakeCase',
    )

    const body = JSON.stringify(newFolderApi)

    const res = await rest.post({ url, body, signal })

    if (res?.response?.status !== 201) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        res?.object?.error?.message || errPostFolderMsg,
      )
    }

    const { object } = res
    const file = convertObjectKeys<FileApi, FileT>(object)
    return { file }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const errPostFileMsg =
  'An error occurred while creating the file. Please try again'

async function postFile(
  userId: number,
  newFile: FileUpload,
  signal?: AbortSignal,
): Promise<PostFileReturnType> {
  try {
    const url = formatURL(`${POST_FILE}`, { userId })

    const formData = new FormData()
    if (newFile.file) formData.append('file', newFile.file)
    const token = localStorage.getItem('token')

    const res = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    })

    if (res.status !== 201) {
      throw new HttpResponseError(res.status ?? null, errPostFileMsg)
    }
    const object = await res.json()
    const file = convertObjectKeys<FileApi, FileT>(object)

    return { file }
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
  updatedFile: FileT,
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
    const file = convertObjectKeys<FileApi, FileT>(object)
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
  updates: Partial<FileT>,
  signal?: AbortSignal,
): Promise<PatchFileReturnType> {
  try {
    const url = formatURL(`${PATCH_FILE}`, { userId, fileId })
    const updatesApi = convertObjectKeys<Partial<FileT>, Partial<FileApi>>(
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
    const file = convertObjectKeys<FileApi, FileT>(object)
    return { file }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const errPatchFilesMsg =
  'An error occurred while updating files. Please try again'

async function patchFiles(
  userId: number,
  filesIds: number[],
  updates: Partial<FileT>,
  signal?: AbortSignal,
): Promise<RestoreFilesReturnType> {
  try {
    const url = formatURL(`${PATCH_FILES}`, { userId })

    const updatesApi = convertObjectKeys<Partial<FileT>, Partial<FileApi>>(
      updates,
      'snakeCase',
    )

    const body = JSON.stringify({ ids: filesIds, updates: updatesApi })
    const res = await rest.patch({ url, body, signal })

    if (res?.response?.status !== 204) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        errPatchFilesMsg,
      )
    }
    return { filesIds: filesIds }
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

const errDeleteFilesMsg =
  'An error occurred while deleting files. Please try again'

async function deleteFiles(
  userId: number,
  filesIds: number[],
  signal?: AbortSignal,
): Promise<DeleteFilesReturnType> {
  try {
    const url = formatURL(`${DELETE_FILES}`, { userId })
    const body = JSON.stringify({ ids: filesIds })
    const res = await rest.delete({ url, body, signal })

    if (res?.response?.status !== 204) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        errDeleteFilesMsg,
      )
    }
    return { filesIds: filesIds }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export {
  getFiles,
  postFolder,
  postFile,
  putFile,
  patchFile,
  patchFiles,
  deleteFile,
  deleteFiles,
}
