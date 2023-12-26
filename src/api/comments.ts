import { rest } from 'helpers/rest'
import { DELETE_COMMENT, GET_COMMENTS, POST_COMMENT } from './urls'
import { convertObjectKeys, formatURL } from './utils'
import { DEFAULT_ERROR_MSG, HttpResponseError } from 'helpers/errors'
import type {
  Comment,
  CommentApi,
  DeleteCommentReturnType,
  GetCommentReturnType,
  PostCommentReturnType,
} from 'types/comments'

const errGetCommentsMsg =
  'An error occurred while getting comments. Please try again'

async function getComments(fileId: number, signal?: AbortSignal) {
  Promise<GetCommentReturnType>
  try {
    // TODO: replace with proper URL and update status code
    // const url = formatURL(`${GET_COMMENTS}`, { fileId })
    const url = 'http://localhost:5000/comments'
    const res = await rest.get({ url, signal })

    if (res?.response?.status !== 200) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        errGetCommentsMsg,
      )
    }

    const { object } = res

    const comments = object?.map(comment =>
      convertObjectKeys<CommentApi, Comment>(comment),
    )

    return { comments }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const errPostCommentMsg =
  'An error occurred while creating the comment. Please try again'

async function postComment(fileId: number, newComment: Omit<Comment, 'id'>) {
  Promise<PostCommentReturnType>
  try {
    // TODO: replace with proper URL and update status code
    // const url = formatURL(`${POST_COMMENT}`, { fileId })
    const url = 'http://localhost:5000/comments'

    const body = JSON.stringify(newComment)

    const res = await rest.post({ url, body })

    if (res?.response?.status !== 201) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        errPostCommentMsg,
      )
    }

    const { object } = res
    const comment = convertObjectKeys<CommentApi, Comment>(object)
    return { comment }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const errDeleteCommentMsg =
  'An error occurred while deleting the comment. Please try again'

async function deleteComment(
  fileId: number,
  commentId: number,
  signal?: AbortSignal,
) {
  Promise<DeleteCommentReturnType>

  try {
    // TODO: replace with proper URL and update status code
    // const url = formatURL(`${DELETE_COMMENT}`, { fileId, commentId })
    const url = 'http://localhost:5000/comments/2'
    const res = await rest.delete({ url, signal })

    if (res?.response?.status !== 204) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        errDeleteCommentMsg,
      )
    }
    return { commentId: commentId }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export { getComments, postComment, deleteComment }
