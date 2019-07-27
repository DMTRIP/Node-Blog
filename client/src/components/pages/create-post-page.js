import React, { Component, Fragment } from 'react';


import Header from '../header';
import Ckeditor from '../ckeditor';
import BonaSerice from '../../services/bona-service';
import UserMassage from '../user-massage';

const bonaSerice = new BonaSerice;
export default class CreatePostPage extends Component{

  state = {
    postData: '',
    title: '',
    file: null,
    status: null,
  };

  createPostHandler =  async () => {
    try {
      const { postData, title, file } = this.state;
      if(postData.length < 200 || title.length < 3) {
       return this.setState({ status: 'info' });
      }

      const formData = new FormData();
      formData.append('postImage', file);
      formData.append('body', postData);
      formData.append('title', title);

      console.log(formData);

      const res = await bonaSerice.createPost(formData);
      this.setState({ status: 'success' });
    } catch (e) {
      this.setState({ status: 'err' });
    }
  };

  ckeditorOnChange = (postData) => {
    this.setState({ postData });
  };

  onTitleChange = (title) => {
    console.log(title);
    this.setState({ title });
  };

  onFileChange = (file) => {
    this.setState({ file });
  };

  render() {
    const { status } = this.state;
    const massage = status === 'err' ? <UserMassage type="err" label='Something went wrong! Post has not been created'/> : null;
    const successMassage = status === 'success' ? <UserMassage type='success' label='Post has been created successfully!!!' /> : null;
    const infoMassage = status === 'info' ? <UserMassage type='info' label='Come on post is too short and fill title too' /> : null;
    return (
      <Fragment>
        <Header />
          <div className="container mb-5">
            <div className="form-group d-flex flex-column">

              <div className='mb-3'>
                 <label className='nice-text '>Your title</label>
                 <input type="text" className="form-control" placeholder="Title"
                        onChange={(e) => this.onTitleChange(e.target.value)}/>
              </div>

              <div>
                <label className='nice-text '>Preview</label> <br/>
                <input onChange={(e) => this.onFileChange(e.target.files[0])} type="file"/>
              </div>

            </div>
            {massage}
            {successMassage}
            {infoMassage}
            <Ckeditor ckeditorOnChage={this.ckeditorOnChange}
                      createPostHandler={this.createPostHandler}/>

          </div>

      </Fragment>
    )
  }
};