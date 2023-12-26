import type {
  GetTagsReturnType,
  PostTagsReturnType,
  DeleteTagReturnType,
  TagApi,
  Tag,
} from 'types/tags'
import { DELETE_TAG, GET_TAGS, POST_TAG } from './urls'
import { convertObjectKeys, formatURL } from './utils'
import { rest } from 'helpers/rest'
import { HttpResponseError } from 'helpers/errors'

const errGetTagsMsg = 'An error occurred while getting tags. Please try again'

async function getTags(fileId: number, signal?: AbortSignal) {
  Promise<GetTagsReturnType>
  try {
    // TODO: replace with proper URL and update status code
    //   const url = formatURL(`${GET_TAGS}`, { fileId })
    const url = 'http://localhost:5000/tags'
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
  fileId: number,
  newTag: Omit<Tag, 'id'>,
  signal?: AbortSignal,
) {
  Promise<PostTagsReturnType>
  try {
    // TODO: replace with proper URL and update status code
    // const url = formatURL(`${POST_TAG}`, { fileId })
    const url = 'http://localhost:5000/tags'

    const body = JSON.stringify(newTag)

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

async function deleteTag(fileId: number, tagId: number, signal?: AbortSignal) {
  Promise<DeleteTagReturnType>
  try {
    // TODO: replace with proper URL and update status code
    //   const url = formatURL(`${DELETE_TAG}`, { fileId, tagId })
    const url = 'http://localhost:5000/tags'
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
