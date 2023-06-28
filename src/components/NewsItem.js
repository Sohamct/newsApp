import React, { Component } from "react";

export default class NewsItem extends Component {
  getColor = () => {
    // console.log(this.props.newsType);
    if(this.props.newsType === "home" ) return `primary`;
    if(this.props.newsType === "business") return "success";
    if(this.props.newsType === "entertainment") return "danger";
    if(this.props.newsType === "sports") return "warning";
    if(this.props.newsType === "health") return "info";
    if(this.props.newsType === "science") return "success";
    if(this.props.newsType === "technology") return "dark";
    if(this.props.newsType === "general") return "primary";
  }
  render() {
    const color = this.getColor();
    let { title, description, imageurl, newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <div style={{
          display : 'flex',
          justifyContent : 'flex-end',
          position : 'absolute',
          right : '0'
        }}>
          <span className={`badge rounded-pill bg-${color}`} style={{left : '85%', zIndex : '1'}}>
              {source}
          </span>
        </div>
          <img
            src={
              (imageurl === null || !imageurl)
                ? "https://images.moneycontrol.com/static-mcnews/2023/05/stocks_nifty-sensex_market-2-770x433.jpg"
                : imageurl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              
            </h5>

            <p className="card-text">{description}...</p>
            <p className="card-text text-danger">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
