import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>  {
    // const { setProgress } = props;
  
    // const loadingBarRef = useRef(null);
  
    // useEffect(() => {
    //   // Example usage of setProgress
    //   setProgress(70);
  
    //   // Example usage of loadingBarRef
    //   loadingBarRef.current.complete();
  
    //   // Other logic
    // }, [setProgress]);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
      
      const updateNews = async () => {
        // setProgress(10);
        setLoading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        
        let data = await fetch(url);
        // setProgress(30);
        let parsedData = await data.json();
        // setProgress(70);
        // console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResult(parsedData.totalResult);
        setLoading(false);
        // setProgress(100);
      }
      useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsDonkey`;
        updateNews();
        // eslint-disable-next-line
      }, []) // useEffect will do task of componentDidMount()
/*
      const handleNextClick = async() => {

        setPage(page + 1);
        updateNews();
      }
      const handlePreviousClick = async () => {
        
        setPage(page - 1);
        updateNews();
      }
      */
      const fetchMoreData = async() => {
        setLoading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResult(parsedData.totalResult);
        setLoading(false);
      };

    // console.log("render");
    if(!props.apiKey){
      return <div>Loading....</div>
    }
    
    return (
      <>
        <h2 className='text-center' style={{margin : '5px 0px', marginTop : '80px'}}>NewsDonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        {/* {loading && <Spinner/>} */}

        <InfiniteScroll
            dataLength={articles.length} //total dataLength
            next={fetchMoreData}
            hasMore={articles.length !== totalResult}
            loader={loading === true && <Spinner/>}
            scrollableTarget="scrollableDiv"
          >
        <div className='container'>
        <div className="row">
          {loading === true && <Spinner/>}
          {articles.map((element) => {

            return <div className="col-md-3" key={element.url} >
                  <NewsItem title={element.title ? element.title.slice(0, 55) : ""}
                   description={element.description ? element.description.slice(0, 40) : ""} imageurl={element.urlToImage} newsUrl={element.url} 
                   author={element.author} date={element.publishedAt} source={element.source.name} newsType={props.category}/>
              </div>
            })}
        </div>
        </div>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className='btn btn-dark' onClick={handlePreviousClick}> &larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResult / props.pageSize)} type="button" className='btn btn-dark' onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
        </InfiniteScroll>
      </>
    )
}
News.defaultProps = {
  country : 'in',
  pageSize : 8,
  category : 'general'
}  

News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}
export default News;
