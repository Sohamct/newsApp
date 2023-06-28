import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country : 'in',
    pageSize : 8,
    category : 'general'
  }  

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
      constructor(props){
        super(props);
        console.log("i sm constructor from news componenet");
        this.state = {
            articles : [],
            loading : true,
            page : 1,
            totalResults : 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsDonkey`;
      }
      componentDidMount = async () =>{ // is is a life cycle method, it will run after render
        this.updateNews();
      }
      async updateNews (){
        // this.props.setProgress(20);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({loading : false})
        this.setState({
          articles : parsedData.articles,
           loading : false,
           totalResults : parsedData.totalResults
        });
        // this.props.setProgress(100);
      }

      handleNextClick = async() => {

        this.setState({page : this.state.page + 1});
        this.updateNews();
      }
      handlePreviousClick = async () => {
        
        this.setState({page : this.state.page - 1});
        this.updateNews();
      }
      fetchMoreData = async() => {
        this.setState({page : this.state.page + 1});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          articles : this.state.articles.concat(parsedData.articles),
           loading : false,
           totalResults : parsedData.totalResults
        });
      };
  render() {
    // console.log("render");
    if(!this.props.apiKey){
      return <div>Loading....</div>
    }
    
    return (
      <>
        <h2 className='text-center' style={{margin : '5px 0px'}}>NewsDonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {/* {this.state.loading && <Spinner/>} */}

        <InfiniteScroll
            dataLength={this.state.articles.length} //total dataLength
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
            scrollableTarget="scrollableDiv"
          >
        <div className='container'>
        <div className="row">
          {this.state.loading === true && <Spinner/>}
          {this.state.articles.map((element) => {

            return <div className="col-md-3" key={element.url} >
                  <NewsItem title={element.title ? element.title.slice(0, 55) : ""}
                   description={element.description ? element.description.slice(0, 40) : ""} imageurl={element.urlToImage} newsUrl={element.url} 
                   author={element.author} date={element.publishedAt} source={element.source.name} newsType={this.props.category}/>
              </div>
            })}
        </div>
        </div>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className='btn btn-dark' onClick={this.handlePreviousClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        </InfiniteScroll>
      </>
    )
  }
}
