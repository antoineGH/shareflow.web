import { DELETE_FILE, GET_FILES, POST_FILE, PUT_FILE } from './urls'
import { rest } from 'helpers/rest'
import { HttpResponseError } from 'helpers/errors'
import { convertObjectKeys, formatURL } from './utils'
import type {
  GetFilesReturnType,
  PostFileReturnType,
  PutFileReturnType,
  DeleteFileReturnType,
  FileApi,
  FileDataApi,
  FileData,
  File,
} from 'types/files'

const errGetFilesMsg = 'An error occurred while getting files. Please try again'

async function getFiles(userId: number, signal?: AbortSignal) {
  Promise<GetFilesReturnType>
  try {
    // TODO: replace with proper URL and update status code
    // const url = formatURL(`${GET_FILES}`, { userId })
    const url = 'http://localhost:5000/files'
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

async function postFile(userId: number, newFile: Omit<File, 'id'>) {
  Promise<PostFileReturnType>
  try {
    // TODO: replace with proper URL and update status code
    // const url = formatURL(`${POST_FILE}`, { userId })
    const url = 'http://localhost:5000/files'
    const body = JSON.stringify(newFile)

    const res = await rest.post({ url, body })

    if (res?.response?.status !== 201) {
      throw new HttpResponseError(res?.response?.status ?? null, errPostFileMsg)
    }

    const { object } = res
    const file = convertObjectKeys<FileApi, File>(object)
    return { file }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const errPutFileMsg =
  'An error occurred while updating the file. Please try again'

async function putFile(userId: number, fileId: number, updatedFile: File) {
  Promise<PutFileReturnType>
  try {
    // TODO: replace with proper URL and update status code
    // const url = formatURL(`${PUT_FILE}`, { userId, fileId })
    const url = 'http://localhost:5000/files'
    const body = JSON.stringify(updatedFile)

    const res = await rest.put({ url, body })

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

const errDeleteFileMsg =
  'An error occurred while deleting the file. Please try again'

async function deleteFile(userId: number, fileId: number) {
  Promise<DeleteFileReturnType>
  try {
    // TODO: replace with proper URL and update status code
    // const url = formatURL(`${DELETE_FILE}`, { userId, fileId })
    const url = 'http://localhost:5000/files'
    const res = await rest.delete({ url })

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

export { getFiles, postFile, putFile, deleteFile }
