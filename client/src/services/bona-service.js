import axios from 'axios';

export default  class BonaService {
 async getPosts() {
    return await axios.get('/api/post');
 };

 // send post data to server
 async createPost(data) {
   return await axios.post('/api/post/create',data);
 };

};