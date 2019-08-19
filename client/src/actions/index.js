 const commentsLoaded = (comments) => {
  return {
    type: 'FETCH_COMMENTS_SUCCESS',
    payload: comments
  }
};

 const commentsRequested = () => {
  return {
    type: 'FETCH_COMMENTS_REQUEST'
  }
};

 const commnetsErr = (err) => {
  return {
    type: 'FETCH_COMMENTS_FAILURE',
    payload: err
  }
};

 const incrementCommnetsPageCount = () => {
   return {
     type: 'INCREMENT_COMMENTS_PAGE_COUNT'
   }
 };

 const addCommentToPost = (data) => {
   return {
     type: 'ADD_COMMENT_TO_POST',
     payload: data
   }
 };

 const onChangeMassage = (massage) => {
   return {
     type: 'ON_CHANGE_MASSAGE',
     payload: massage
   }
 };



const nextPage = (dispatch) => ( incrementPage, fetchData, postId, pageCount) => {
  dispatch(incrementPage());
  fetchData(postId, pageCount);
};

const fetchComments = (bonaService, dispatch) =>  async  (postId, num) => {
  dispatch(commentsRequested());

  try {
    const { data } = await bonaService.getCommentPage(postId, num);
    dispatch(commentsLoaded(data));
  } catch(err) {
    dispatch(commnetsErr(err));
  }
};

const addComment = (bonaService, dispatch) => async (e, massage, postId) => {
  e.preventDefault();

  if(massage.length === 0) return;

   const {data: { name, avatar }} = await bonaService.getUser();
   const { data: { date }} = await bonaService.getDate();

   const comment = {
     authorName: name,
     authorAvatar: avatar,
     created: date,
     massage,
   };

   dispatch(addCommentToPost(comment));

   bonaService.addComment(postId, massage);

 };

 // Single post page

 const fetchSinglePost = () => {
   return {
     type: 'FETCH_SINGLE_POST',
   }
 };

 const singlePostLoaded = (post) => {
   return {
     type: 'FETCH_SINGLE_POST_SUCCESS',
     payload: post
   };
 };

 const singlePostErr = (err) => {
   return {
     type: 'FETCH_SINGLE_POST_FAILURE',
     payload: err
   }
 };

 const fetchPost = (bonaService, dispatch) => async (postId) => {
   dispatch(fetchSinglePost());

   try{
     const { data } = await bonaService.getPost(postId);
     dispatch(singlePostLoaded(data));
   } catch (err) {
     dispatch(singlePostErr(err));
   }
 };

 // POST

 const setPostData = (data) => {
   return {
     type: 'UPDATE_POST_DATA',
     payload: data
   }
 };

 const incrementPageCount = () => {
   return {
     type: 'INCREMENT_PAGE_COUNT',
   }
 };

 const addLike = (id, bonaService) => {
   return {
     type: 'ADD_LIKE',
     payload: {
       id,
       bonaService
     }
   }
 };

 const likeRequest = (dispatch, bonaService) => (id) => {
   dispatch(addLike(id, bonaService));
 };

export {
  fetchComments,
  incrementCommnetsPageCount,
  nextPage,
  addComment,
  onChangeMassage,

  fetchPost,

  setPostData,
  likeRequest,
}
