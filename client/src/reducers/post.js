
const addLikeToServer = async (oldPost, bonaService) => {
  if(oldPost.like) {
    await bonaService.deleteLikeFromPost(oldPost.id);
  } else {
    await bonaService.addLikeToPost(oldPost.id);
  }
};

const addLike = (id, postData, bonaService) => {

    const idx = postData.findIndex(e => e.id === id);
    const oldPost = postData[idx];

    const newPost = {...oldPost, like: !oldPost.like};

    if(oldPost.like) {
      newPost.data.likes.pop();
    } else {
      newPost.data.likes.push(1);
    }
    const newArr = [
      ...postData.slice(0, idx),
      newPost,
      ...postData.slice(idx + 1)
    ];

    addLikeToServer(oldPost, bonaService);

    return {
      postData: newArr
    }


};

const updatePost = (state, action) => {
  if(state === undefined) {
    return {
      postData: null,
      pageNum: 0,
      like: false,
      edit: false,
      err: false
    }
  }
  const { post } = state;


  switch (action.type) {

    case 'UPDATE_POST_DATA':
      return {
        ...post,
        postData: action.payload
      };

    case 'INCREMENT_PAGE_COUNT':
      return {
        ...post,
        pageNum: post.pageNum += 1
      };

    case 'ADD_LIKE':
      const { id, bonaService } = action.payload;
      const data = post.postData;
      const { postData } = addLike(id, data, bonaService);

      return {
        ...post,
        postData
      };

    default:
      return state.post
  }
};

export default updatePost;