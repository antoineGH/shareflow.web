import type {
  GetTagsReturnType,
  PostTagsReturnType,
  DeleteTagReturnType,
  TagApi,
  Tag,
} from 'types/tags'
import { DELETE_TAG, GET_TAGS, POST_TAG } from './urls'
import { convertObjectKeys, formatURL, generateUrlParams } from './utils'
import { rest } from 'helpers/rest'
import { HttpResponseError } from 'helpers/errors'

const errGetTagsMsg = 'An error occurred while getting tags. Please try again'

type GetTags = {
  userId: number
  fileId?: number
  search?: string
  signal?: AbortSignal
}

async function getTags({ userId, fileId, search, signal }: GetTags) {
  Promise<GetTagsReturnType>
  try {
    const queries = generateUrlParams({ search })
    fileId = fileId ?? -1
    const baseUrl = formatURL(`${GET_TAGS}`, { userId, fileId })
    const url = `${baseUrl}?${queries}`
    const res = await rest.get({ url, signal })

    if (res?.response?.status !== 200) {
      throw new HttpResponseError(res?.response?.status ?? null, errGetTagsMsg)
    }

    const { object } = res
    const tags: Tag[] = object?.map(tag => convertObjectKeys<TagApi, Tag>(tag))

    return { tags }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const errPostTagMsg =
  'An error occurred while creating the tag. Please try again'

async function postTag(
  userId: number,
  fileId: number,
  newTag: string,
  signal?: AbortSignal,
) {
  Promise<PostTagsReturnType>
  try {
    const url = formatURL(`${POST_TAG}`, { userId, fileId })

    const body = JSON.stringify({
      tag: newTag,
    })

    const res = await rest.post({ url, body, signal })

    if (res?.response?.status !== 201) {
      throw new HttpResponseError(res?.response?.status ?? null, errPostTagMsg)
    }

    const { object } = res
    const tag = convertObjectKeys<TagApi, Tag>(object)
    return { tag }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const errDeleteTagMsg =
  'An error occurred while deleting the tag. Please try again'

async function deleteTag(
  userId: number,
  fileId: number,
  tagId: number,
  signal?: AbortSignal,
) {
  Promise<DeleteTagReturnType>
  try {
    const url = formatURL(`${DELETE_TAG}`, { userId, fileId, tagId })
    const res = await rest.delete({ url, signal })

    if (res?.response?.status !== 204) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        errDeleteTagMsg,
      )
    }

    return { tagId }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export { getTags, postTag, deleteTag }
