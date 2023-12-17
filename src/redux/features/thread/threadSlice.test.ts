import { describe, it, expect, beforeAll } from 'vitest';
import {
  THREAD_REDUCER,
  neutralizeVote,
  pushNewComment,
  pushNewDownVote,
  pushNewUpVote,
} from './threadSlice';
import { type TThreadState } from '@/interfaces/thread.interface';
import { type TUser } from '@/interfaces/user.interface';

describe('thread reducers function', () => {
  let previousState: TThreadState;
  let owner: TUser;

  beforeAll(() => {
    owner = {
      id: 'owner-id',
      name: 'owner-name',
      email: 'owner@gmail.com',
      avatar: 'avatar',
    };

    previousState = {
      threads: [],
      loading: false,
      message: null,
      error: null,
      detailThread: {
        id: 'thread-Np47p4jhUXYhrhRn',
        title: 'Bagaimana pengalamanmu belajar Redux?',
        body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
        createdAt: '2023-05-29T07:55:52.266Z',
        owner,
        category: 'Redux',
        comments: [],
        upVotesBy: [],
        downVotesBy: [],
      },
      categoryCount: {},
    };
  });

  it('should return the initial state when given by unknown action', () => {
    expect(THREAD_REDUCER(undefined, { type: undefined })).toEqual({
      threads: [],
      loading: false,
      message: null,
      error: null,
      detailThread: null,
      categoryCount: {},
    });
  });

  it('should handle a new comment being added to state', () => {
    const newComment = {
      id: 'random-id',
      content: 'new content',
      createdAt: 'new date',
      owner,
      upVotesBy: [],
      downVotesBy: [],
    };

    expect(
      THREAD_REDUCER(previousState, pushNewComment({ newComment })),
    ).toEqual({
      ...previousState,
      detailThread: { ...previousState.detailThread, comments: [newComment] },
    });
  });

  it('should handle a thread up vote being added to state', () => {
    const newUpVotersId = 'user-id';

    expect(
      THREAD_REDUCER(
        previousState,
        pushNewUpVote({ newUserId: newUpVotersId }),
      ),
    ).toEqual({
      ...previousState,
      detailThread: {
        ...previousState.detailThread,
        upVotesBy: [
          ...(previousState.detailThread?.upVotesBy as []),
          newUpVotersId,
        ],
        downVotesBy: [
          ...(previousState.detailThread?.downVotesBy as []),
        ].filter((userId) => userId !== newUpVotersId),
      },
    });
  });

  it('should handle a thread down vote being added to state', () => {
    const newDownVotersId = 'user-id';

    expect(
      THREAD_REDUCER(
        previousState,
        pushNewDownVote({ newUserId: newDownVotersId }),
      ),
    ).toEqual({
      ...previousState,
      detailThread: {
        ...previousState.detailThread,
        downVotesBy: [
          ...(previousState.detailThread?.downVotesBy as []),
          newDownVotersId,
        ],
        upVotesBy: [...(previousState.detailThread?.upVotesBy as [])].filter(
          (userId) => userId !== newDownVotersId,
        ),
      },
    });
  });

  it('should handle a thread neutralize vote being added to state', () => {
    const userIdOfVoters = 'user-id';

    expect(
      THREAD_REDUCER(
        previousState,
        neutralizeVote({ newUserId: userIdOfVoters }),
      ),
    ).toEqual({
      ...previousState,
      detailThread: {
        ...previousState.detailThread,
        downVotesBy: [
          ...(previousState.detailThread?.downVotesBy as []),
        ].filter((userId) => userId !== userIdOfVoters),
        upVotesBy: [...(previousState.detailThread?.upVotesBy as [])].filter(
          (userId) => userId !== userIdOfVoters,
        ),
      },
    });
  });
});
