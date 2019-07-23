import axios from 'axios';

export default  class BonaService {
 async getPosts() {
    return await axios.get('/api/post');
 }

};