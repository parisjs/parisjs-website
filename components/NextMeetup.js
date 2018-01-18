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
    fetchJsonp(
      'https://api.meetup.com/Paris-js/events?desc=true&photo-host=public&page=1&sig_id=77326482&status=upcoming&sig=37450db01a2fb58b77a6664d78aa6ebb601ae65f'
    )
      .then(resp => resp.json())
      .then(resp => {
        if (resp.data && resp.data[0]) {
          this.setState({
            nextEvent: {
              title: resp.data[0].name,
              date: new Date(resp.data[0].time),
              link: resp.data[0].link,
              rsvp: resp.data[0].yes_rsvp_count,
              host: resp.data[0].venue.name,
              address: resp.data[0].venue.address_1
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
