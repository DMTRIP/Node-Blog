import axios from "axios";
import AuthHelper from '../components/helpers/auth-helper'
const auth = new AuthHelper();
const userId = auth.getId();
export default  class BonaService {

 getPosts = async () => {
    return await axios.get('/api/post');
 };

 getMyPost = async () => {
   return await axios.get(`/api/user/${userId}/post`);
 };

 getRecommendedPost = async () => {
   return await axios.get('/api/user/post/recommended');
 };

 getUser = async () => {
   return await axios.get(`/api/user/${userId}`);
 };

 getPost = async (id) => {
   return await axios.get(`/api/post/${id}`);
 };

 createUser = async (data) => {
   return await axios.post('/api/sign-up', data);
 };

 login = async (data) => {
   return await axios.post('/api/login', data);
 };

 postPage = async num => {
   return await axios.get(`/api/post/page/${num}`);
 };

 myPostPage = async num => {
   return await  axios.get(`/api/user/${userId}/post/page/${num}`);
 };

 captchaVereficate = async (captcha) => {
   return await axios.post('/api/re-captcha', { captcha });
 };

 // send post data to server
 async createPost(data) {
   return await axios.post(`/api/user/${userId}/post/create`,data);
 };

 addLikeToPost = async (postId) => {
   return await axios.post(`/api/post/like/${userId}/${postId}`);
 };

 deleteLikeFromPost = async (postId) => {
   return await axios.delete(`/api/user/like/${userId}/${postId}`);
 };

  deletePost = async (postId) => {
    return axios.delete(`/api//post/${postId}`);
  };

};