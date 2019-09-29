import React from 'react'
import { FormattedDate, FormattedMessage } from 'react-intl'
import fetchJsonp from 'fetch-jsonp'

import MdDateRange from 'react-icons/lib/md/date-range'
import MdPlace from 'react-icons/lib/md/place'
import MdGroup from 'react-icons/lib/md/group'

import FaSlack from 'react-icons/lib/fa/slack'
import FaTwitter from 'react-icons/lib/fa/twitter'
import FaGoogle from 'react-icons/lib/fa/google'
import FaMeetup from './FaMeetup'

const MEETUP_URL = 'https://www.meetup.com/fr-FR/Paris-js/'

function renderEvent(event) {
  return (
    <div>
      <h3 className="NextMeetup__Title">
        <FormattedMessage id="NEXTMEETUP_NEXT" /> <span>{event.title}</span>
      </h3>

      <div className="NextMeetup__Info">
        <MdDateRange
          color="#45494D"
          size={18}
          className="NextMeetup__InfoIcon"
        />
        <FormattedDate
          value={event.date}
          weekday="short"
          day="2-digit"
          month="long"
          year="numeric"
          hour="numeric"
          minute="numeric"
        />
      </div>

      <div className="NextMeetup__Info">
        <MdPlace color="#45494D" size={18} className="NextMeetup__InfoIcon" />
        <span>
          {event.host} - {event.address}
        </span>
      </div>

      <div className="NextMeetup__Info">
        <MdGroup color="#45494D" size={18} className="NextMeetup__InfoIcon" />
        <FormattedMessage
          id="NEXTMEETUP_PERSONS"
          values={{ persons: event.rsvp }}
        />
      </div>
    </div>
  )
}

class NextMeetup extends React.Component {
  constructor(props) {
    super(props)
    this.state = { nextEvent: props.nextEvent }
  }

  componentDidMount() {
    const feedUrl = 'https://www.meetup.com/fr-FR/Paris-js/events/json/'
    const url = `https://cors-anywhere.herokuapp.com/${feedUrl}`
    window
      .fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.length) {
          this.setState({
            nextEvent: {
              title: data[0].title,
              date: new Date(data[0].servertime),
              link: data[0].event_url,
              rsvp: data[0].confirmCount,
              host: data[0].venue_name,
              address: `${data[0].venue_address1} ${data[0].venue_city}`
            }
          })
        }
      })
  }

  render() {
    return (
      <div className="NextMeetup">
        {this.state.nextEvent ? (
          renderEvent(this.state.nextEvent)
        ) : (
          <h3 className="NextMeetup__Title NextMeetup__TitleNoMeetup">
            <FormattedMessage id="NEXTMEETUP_NO_EVENT" />
          </h3>
        )}
        <div className="hero__actions">
          {this.state.nextEvent && (
            <a
              className="btn NextMeetup__RegisterButton"
              href={this.state.nextEvent.link}
            >
              <FaMeetup
                size={30}
                color="#FFF"
                className="NextMeetup__RegisterButtonIcon"
              />
              <FormattedMessage
                id="NEXTMEETUP_RVSP"
                className="NextMeetup__RegisterButtonText"
              />
            </a>
          )}
          {!this.state.nextEvent && (
            <a className="btn NextMeetup__RegisterButton" href={MEETUP_URL}>
              <FaMeetup
                size={30}
                color="#FFF"
                className="NextMeetup__RegisterButtonIcon"
              />
              <FormattedMessage
                id="GOTO_MEETUP"
                className="NextMeetup__RegisterButtonText"
              />
            </a>
          )}
          <p>
            <FormattedMessage id="NEXTMEETUP_MEET_THE_COMMUNITY_ON" />{' '}
            <a href="https://slack-francejs.now.sh/">
              <FaSlack size={24} color="#C5C9CC" /> Slack
            </a>{' '}
            <a href="https://twitter.com/parisjs">
              <FaTwitter size={24} color="#C5C9CC" /> Twitter
            </a>{' '}
            <a href="http://groups.google.com/group/parisjs">
              <FaGoogle size={24} color="#C5C9CC" /> Google Groups
            </a>
          </p>
        </div>
      </div>
    )
  }
}

export default NextMeetup
