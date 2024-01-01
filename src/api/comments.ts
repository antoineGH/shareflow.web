import { rest } from 'helpers/rest'
import { DELETE_COMMENT, GET_COMMENTS, POST_COMMENT } from './urls'
import { convertObjectKeys, formatURL } from './utils'
import { HttpResponseError } from 'helpers/errors'
import type {
  Comment,
  CommentApi,
  DeleteCommentReturnType,
  GetCommentReturnType,
  PostCommentReturnType,
} from 'types/comments'

const errGetCommentsMsg =
  'An error occurred while getting comments. Please try again'

async function getComments(
  userId: number,
  fileId: number,
  signal?: AbortSignal,
) {
  Promise<GetCommentReturnType>
  try {
    const url = formatURL(`${GET_COMMENTS}`, { userId, fileId })
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

async function postComment(
  userId: number,
  fileId: number,
  newComment: Omit<Comment, 'id'>,
) {
  Promise<PostCommentReturnType>
  try {
    const url = formatURL(`${POST_COMMENT}`, { userId, fileId })

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
  userId: number,
  fileId: number,
  commentId: number,
  signal?: AbortSignal,
) {
  Promise<DeleteCommentReturnType>

  try {
    const url = formatURL(`${DELETE_COMMENT}`, { userId, fileId, commentId })
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
