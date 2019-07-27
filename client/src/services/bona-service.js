import axios from 'axios';

export default  class BonaService {
 getPosts = async () => {
    return await axios.get('/api/post');
 };

 getMyPost = async () => {
   return await axios.get('/api/user/5d1e35c66449bd7317ca971d/post');
 };

 // send post data to server
 async createPost(data) {
   return await axios.post('/api/post/create',data);
 };

};