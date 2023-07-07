import React from 'react'
import { MdDateRange, MdPlace, MdGroup } from 'react-icons/md'
import { FaDiscord, FaTwitter, FaGoogle, FaMeetup, FaYoutube } from 'react-icons/fa'
import i18next from 'i18next'

const MEETUP_URL = 'https://www.meetup.com/paris-js/'

function Event({ event }) {
  return (
    <div>
      <h3 className="NextMeetup__Title">
        {i18next.t('NEXTMEETUP_NEXT')} <span>{event.title}</span>
      </h3>

      <div className="NextMeetup__Info">
        <MdDateRange
          color="#45494D"
          size={18}
          className="NextMeetup__InfoIcon"
        />
        {new Date(event.date).toLocaleDateString(i18next.language, {
          weekday: 'short',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}
      </div>

      <div className="NextMeetup__Info">
        <MdPlace color="#45494D" size={18} className="NextMeetup__InfoIcon" />
        <span>
          {event.host} - {event.address}
        </span>
      </div>

      <div className="NextMeetup__Info">
        <MdGroup color="#45494D" size={18} className="NextMeetup__InfoIcon" />
        {i18next.t('NEXTMEETUP_PERSONS', { persons: event.rsvp })}
      </div>
    </div>
  )
}

function NextMeetup({ nextMeetup }) {
  return (
    <div className="NextMeetup">
      {nextMeetup ? (
        <Event event={nextMeetup} />
      ) : (
        <h3 className="NextMeetup__Title NextMeetup__TitleNoMeetup">
          {i18next.t('NEXTMEETUP_NO_EVENT')}
        </h3>
      )}
      <div className="hero__actions">
        {nextMeetup && (
          <a className="btn NextMeetup__RegisterButton" href={nextMeetup.link}>
            <FaMeetup
              size={30}
              color="#FFF"
              className="NextMeetup__RegisterButtonIcon"
            />
            <span className="NextMeetup__RegisterButtonText">
              {i18next.t('NEXTMEETUP_RVSP')}
            </span>
          </a>
        )}
        {!nextMeetup && (
          <a className="btn NextMeetup__RegisterButton" href={MEETUP_URL}>
            <FaMeetup
              size={30}
              color="#FFF"
              className="NextMeetup__RegisterButtonIcon"
            />
            <span className="NextMeetup__RegisterButtonText">
              {i18next.t('GOTO_MEETUP')}
            </span>
          </a>
        )}
        <p>
          {i18next.t('NEXTMEETUP_MEET_THE_COMMUNITY_ON')}{' '}
          <a href="https://discord.gg/t6t8jhAaVz">
            <FaDiscord size={24} color="#C5C9CC" /> Discord
          </a>{' '}
          <a href="https://twitter.com/parisjs">
            <FaTwitter size={24} color="#C5C9CC" /> Twitter
          </a>{' '}
          <a href="https://www.youtube.com/parisjs">
            <FaYoutube size={24} color="#C5C9CC" /> Youtube
          </a>
        </p>
      </div>
    </div>
  )
}

export default NextMeetup
