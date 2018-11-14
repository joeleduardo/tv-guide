import React from 'react';
import PropTypes from 'prop-types';
import styles from './Show.scss';

class Show extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      type: props.match.params.type,
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      show: {}
    }
  }

  componentDidMount() {
    let param;

    if (this.props.match.params.type === 'next') {
      param = 'dummy_program_id';
    } else if (this.props.match.params.type === 'prev') {
      param = 'program_catchup_id';
    } else {
      param = 'program_live_id'
    }

    this.props.getShow(param);
  }

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      this.setState({
        show: this.props.show
      })
    }
  }

  render() {
    const getTime = (time) => {
      const date = new Date(time);
      const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      return `${hour}:${minutes}`
    }

    const setFutureLabel = (start, end) => {
      const startTime = getTime(start);
      const endTime = getTime(end);
      const date = new Date(start);

      return `${date.getDate()} ${this.state.months[date.getMonth()]} / ${startTime} - ${endTime} `
    }

    const setPastLabel = (start) => {
      let delta = Math.abs(new Date() - new Date(start)) / 1000;

      const days = Math.floor(delta / 86400);
      delta -= days * 86400;

      const hours = Math.floor(delta / 3600) % 24;
      //delta -= hours * 3600;

      // const minutes = Math.floor(delta / 60) % 60;
      // delta -= minutes * 60;

      return `${days}d ${hours}h`
    }

    return (
      <article className={styles.show}>
        <div className={styles.back} onClick={() => this.props.history.goBack()} />
        {this.state.type === 'live' &&
        <div className={styles.liveLabel}>
          <div className={styles.liveLabelIco} />
          Live
        </div>
        }
        {this.state.type === 'next' &&
        <div className={styles.futureLabel}>
          <div className={styles.futureLabelIco} />
          {setFutureLabel(this.state.show.start, this.state.show.end)}
        </div>
        }
        {this.state.type === 'prev' &&
        <div className={styles.pastLabel}>
          {setPastLabel(this.state.show.start)}
        </div>
        }
        {this.state.show.images &&
        <div className={styles.image} style={{backgroundImage: `url(${this.state.show.images.icon})`}}>
          {this.state.type !== 'next' &&
          <div className={styles.playIco}/>
          }
        </div>
        }
        <section>
          <div className={styles.channelInfo}>
            {this.state.show.channelImages &&
            <div className={styles.channelIco} style={{backgroundImage: `url(${this.state.show.channelImages.logo})`}}/>
            }
            <div className={styles.channelDetails}>
              <h2>{this.state.show.channelTitle}</h2>
              <h1>{this.state.show.title}</h1>
              <ul>
                {this.state.show.meta &&
                <li>{this.state.show.meta.year}</li>
                }
                {this.state.show.meta && this.state.show.meta.genres.map(genre => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
          <p>
            {this.state.show.description}
          </p>
          <ul className={styles.channelAggregation}>
            <li>Cast: </li>
            {this.state.show.meta && this.state.show.meta.cast.map(cast => (
              <li key={cast.name}>{cast.name},</li>
            ))}
          </ul>
          <ul className={styles.channelAggregation}>
            <li>Creators: </li>
            {this.state.show.meta && this.state.show.meta.creators.map(creator => (
              <li key={creator.name}>{creator.name},</li>
            ))}
          </ul>
        </section>
      </article>
    )
  }
}

Show.propTypes = {
  getShow: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  show: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Show;