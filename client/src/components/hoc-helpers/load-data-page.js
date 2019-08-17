import React, { Component } from 'react';
import Spinner from "../spinner";

const loadDataPage = (View, getData) => {
  return class extends Component {
    state = {
      pageData: null,
      pageNum: 0,
      loading: true,
      err: false,
    };

    componentDidMount() {
      const { pageNum } = this.state;
      this.init(pageNum);
    }

    async init (pageNum) {
      const { pageData } = this.state;
      try {
        const { data } = await getData(pageNum);
        console.log(data);
        const postDataApi = data.map((e) => {
          let isLike = false;

          if(e.likes.length > 0) {
            const id = localStorage.getItem('id');
            e.likes.map(e => {
              if(e.author === id) isLike = true;
            });
          }

          return {
            id: e._id,
            like: isLike,
            data: e,
          }
        });

        if(pageData) {
          this.setState(({ pageData }) => {
            const oldArr = [...pageData];
            const newArr = [...pageData, ...postDataApi];

            return {
              pageData: newArr
            };
          });
        } else {
          this.setState({ pageData: postDataApi });
        }

      } catch (e) {
        this.setState({ err: true })
      }

    };

    nextPage = (pageNum) => {

      this.setState(({ pageNum }) => {
        let newNum = pageNum;
        newNum++;
        return {
          pageNum: newNum
        }
      });

      this.init(this.state.pageNum + 1);
    };

   render() {
     const { pageData } = this.state;
     if(!pageData) return <Spinner />;

     return (
       <View pageData={pageData} nextPage={this.nextPage} {...this.props}/>
     )
   }

  };
};

export default loadDataPage;