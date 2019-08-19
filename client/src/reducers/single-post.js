const updateSinglePost = (state, action) => {

  if(state === undefined) {
    return {
      post: {},
      loading: true,
      err: null,
    };
  }


  switch (action.type) {
    case 'FETCH_SINGLE_POST':
      return {
        post: {},
        loading: true,
        err: null
      };

    case 'FETCH_SINGLE_POST_SUCCESS':
      return {
        post: action.payload,
        loading: false,
        err: null
      };

    case 'FETCH_SINGLE_POST_FAILURE':
      return {
        post: {},
        loading: false,
        err: action.payload
      };

    default:
      return state.singlePost;
  }

};

export default updateSinglePost;