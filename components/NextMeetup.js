import React from 'react'
import { FormattedMessage } from 'react-intl'

const NextMeetup = () => {
  const nextEvent = false

  return (
    <div className="NextMeetup">
      <h3>{ nextEvent ? <FormattedMessage id="NEXTMEETUP_NEXT" /> : <FormattedMessage id="NEXTMEETUP_NO_EVENT" /> }</h3>
      <div className="hero__actions">
        { nextEvent && <a className="btn" href="https://www.meetup.com/fr-FR/Paris-js/">
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

export default NextMeetup
