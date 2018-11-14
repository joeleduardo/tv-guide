import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Home.scss';

class Home extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      hourSize: 200,
      channelSize: 60,
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
    }

    this.content = React.createRef();
  }

  componentDidMount() {
    this.props.getEpgs();
    this.content.current.scrollLeft += this.setSchedulePosition() - this.state.hourSize;
  }

  setSchedulePosition() {
    const currentDate = new Date();

    const sizeH = currentDate.getHours() * this.state.hourSize;
    const sizeM = Math.round((currentDate.getMinutes() / 60 ) * this.state.hourSize);

    return sizeH + sizeM + this.state.channelSize
  }

  clickNowBtn () {
    this.content.current.scrollLeft = this.setSchedulePosition() - this.state.hourSize;
  }

  render() {
    const getTime = (time) => {
      const date = new Date(time);
      const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      return `${hour}:${minutes}`
    }

    const getTimeDiff = (start, end) => {
      start = start.split(':');
      end = end.split(':');

      const startDate = new Date(0, 0, 0, start[0], start[1], 0);
      const endDate = new Date(0, 0, 0, end[0], end[1], 0);
      let diff = endDate.getTime() - startDate.getTime();

      let hours = Math.floor(diff / 1000 / 60 / 60);
      diff -= hours * 1000 * 60 * 60;
      const minutes = Math.floor(diff / 1000 / 60);

      if (hours < 0) {
        hours = hours + 24;
      }

      return [(hours <= 9 ? `0${hours}` : hours), (minutes <= 9 ? `0${minutes}` : minutes)]
    }

    const setShowSize = (start, end) => {
      const startTime = getTime(start);
      const endTime = getTime(end);
      const diffTime = getTimeDiff(startTime, endTime);

      const sizeH = Math.round((diffTime[0] / 60 ) * this.state.hourSize);
      const sizeM = Math.round((diffTime[1] / 60 ) * this.state.hourSize);

      return sizeH + sizeM
    }

    const setShowBgColor = (start, end) => {
      const currentDate = new Date();
      let color = '#000';

      if(Date.parse(currentDate) > Date.parse(start) && Date.parse(currentDate) < Date.parse(end)) {
        color = '#303030';
      }

      return color
    }

    const setDate = () => {
      const currentDate = new Date();
      const day = this.state.days[currentDate.getDay()];
      const month = this.state.months[currentDate.getMonth()];

      return `${day} ${currentDate.getDate()} ${month} ${currentDate.getFullYear()}`
    }

    const setUrl = (start, end) => {
      const currentDate = new Date();
      let url = 'live';

      if (Date.parse(start) > Date.parse(currentDate)) {
        url = `next`;
      }

      if (Date.parse(currentDate) > Date.parse(end)) {
        url = `prev`;
      }

      return url
    }

    return(
      <div className={styles.schedule}>
        <div className={styles.date}>
          <button type='button' onClick={() => this.clickNowBtn()}>Now</button>
          {setDate()}
        </div>
        <aside>
          <ul>
            <li>Time</li>
            {this.props.epgs.channels && this.props.epgs.channels.map(channel => (
              <li key={channel.id} style={{backgroundImage: `url(${channel.images.logo})`, width: `${this.state.channelSize}px` }} />
            ))}
          </ul>
        </aside>
        <section ref={this.content}>
          <div className={styles.shows}>
            <div className={styles.marker} style={{marginLeft: `${this.setSchedulePosition()}px`}}>
              <div className={styles.markerHeader} />
            </div>
            <ul>
              {this.state.hours.map(hour => (
                <li key={hour} className={styles.hours} style={{width: `${this.state.hourSize}px`}}>{hour}:00</li>
              ))}
            </ul>
            {this.props.epgs.channels && this.props.epgs.channels.map(channel => (
              <ul key={`${channel.id}-list`}>
                {channel.schedules && channel.schedules.map((show, index) => (
                  <li key={index} style={{height: `${this.state.channelSize}px`, width: `${setShowSize(show.start, show.end)}px`, backgroundColor: setShowBgColor(show.start, show.end)}}>
                    <Link to={`/show/${setUrl(show.start, show.end)}`} style={{height: `${this.state.channelSize}px`}}>
                      <div>{show.title}</div>
                      <span>{getTime(show.start)} - {getTime(show.end)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      </div>
    )
  }
}

Home.propTypes = {
  getEpgs: PropTypes.func.isRequired,
  epgs: PropTypes.object.isRequired
};


export default Home;