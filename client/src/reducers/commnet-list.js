const updateCommentList = (state, action) => {

  if(state === undefined) {
    return {
      comments: [],
      pageCount: 0,
      commentAmt: 0,
      massage: '',
      loading: true,
      err: null
    }
  }

  const { commentList } = state;

  switch (action.type) {
    case 'FETCH_COMMENTS_REQUEST':
      return {
        ...commentList,
        loading: true,
        err: null
      };

    case 'FETCH_COMMENTS_SUCCESS':
      const { page, commentAmt } = action.payload;
      return {
        ...commentList,
        comments: [...commentList.comments, ...page],
        commentAmt,
        loading: false,
        err: null
      };

    case 'FETCH_COMMENTS_FAILURE':
      return {
        ...commentList,
        comments: [],
        loading: false,
        err: action.payload
      };

    case 'INCREMENT_COMMENTS_PAGE_COUNT':
      return {
        ...commentList,
        pageCount: commentList.pageCount += 1
      };

    case 'ADD_COMMENT_TO_POST':
      return {
        ...commentList,
        comments: [action.payload, ...commentList.comments],
        commentAmt: commentList.commentAmt += 1
      };

    case 'ON_CHANGE_MASSAGE':
      return {
        ...commentList,
        massage: action.payload
      };


    default:
      return state.commentList;
  }
};

export default updateCommentList;