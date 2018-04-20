import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import './styles.css'

class CarouselImages extends Component {
  state = { events: [], loaded: false }

  componentDidMount() {
    axios.get('/api/events')
      .then( res => {
        console.log(res)
        this.setState({ events: res.data, loaded: true })
    }).catch(err => {
        console.log(err)
    })
  }

  displayCarousel = () => {
    const { events, loaded } = this.state
    // const carouselEvents = [events[0], events[3]]
    if(loaded){
      return events.slice(0, 4).map( event => {
        return(
          <div>
            <img src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F42510282%2F34033487363%2F1%2Foriginal.jpg?w=600&auto=compress&rect=0%2C60%2C1920%2C960&s=c34b0b3492b026493e0604fe920a5187" alt="" />
            <p className="legend">
              {event.title} 
              <Link to ={`/event/${event.id}`}>
                View Details
              </Link>
            </p>
          </div>
        )
      })
    }
  }

  render() {
    return (
      <Carousel showArrows={true} autoPlay={true} interval="5000" infiniteLoop={true}>
        {this.displayCarousel()}
      </Carousel>
    );
  }
}
  
export default CarouselImages;