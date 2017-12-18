import React from 'react'
import { FormattedDate, FormattedMessage } from 'react-intl'

import fetchJsonp from "fetch-jsonp"

function renderEvent (event) {
  return (
    <div>
      <h3>
        <FormattedMessage id="NEXTMEETUP_NEXT" />
      </h3>

      <div>
        <div>
          <h4>{ event.title }</h4>
          <p><FormattedMessage id="NEXTMEETUP_PERSONS" values={{persons: event.rsvp}} /></p>
        </div>
        <div>
          <ul>
            <li>
              <FormattedDate
                value={ event.date }
                weekday='short'
                day='2-digit'
                month='long'
                year='numeric'
                hour='numeric'
                minute='numeric'
              />
            </li>
            <li>
              { event.host } <br />
              { event.address }
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

class NextMeetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nextEvent: props.nextEvent };
  }

  componentDidMount() {
    fetchJsonp('https://api.meetup.com/Paris-js/events?desc=true&photo-host=public&page=1&sig_id=77326482&status=upcoming&sig=37450db01a2fb58b77a6664d78aa6ebb601ae65f')
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

  render () {
    return (
      <div className="NextMeetup">
        { this.state.nextEvent ?
          (renderEvent(this.state.nextEvent)) :
          (<h3><FormattedMessage id="NEXTMEETUP_NO_EVENT" /></h3>)
        }
        <div className="hero__actions">
          { this.state.nextEvent && <a className="btn" href={ this.state.nextEvent.link }>
            <FormattedMessage id="NEXTMEETUP_RVSP" />
          </a> }
          <p>
            <FormattedMessage id="NEXTMEETUP_MEET_THE_COMMUNITY_ON" />
            { " " }
            <a href="https://slack-francejs.now.sh/">
              <img src="assets/icons/icon-slack.svg" alt="" width="24" height="24" /> Slack
            </a>
            { " " }
            <a href="https://twitter.com/parisjs">
              <img src="assets/icons/icon-twitter.svg" alt="" width="24" height="24" /> Twitter
            </a>
            { " " }
            <a href="http://groups.google.com/group/parisjs">
              <img src="assets/icons/icon-google.svg" alt="" width="24" height="24" /> Google Groups
            </a>
          </p>
        </div>
      </div>
    )
  }
}

export default NextMeetup
