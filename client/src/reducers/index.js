
import updateCommentList from './commnet-list';
import updateSinglePost from './single-post';
import updatePost from './post';

const reducer = (state, action) => {

  return {
   commentList: updateCommentList(state, action),
   singlePost: updateSinglePost(state, action),
   post: updatePost(state, action),
 }

};

export default reducer;