import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { createApp, renderApp } from '@phenomic/preset-react-app/lib/client'

import PageError from './components/PageError'

import FAQContainer from './components/FAQContainer'
import HomeContainer from './components/HomeContainer'
import MeetupContainer from './components/MeetupContainer'
import SearchContainer from './components/SearchContainer'
import SponsorsContainer from './components/SponsorsContainer'
import TalkSubmissionContainer from './components/TalkSubmissionContainer'

import './styles.css'

function hashLinkScroll() {
  const { hash } = window.location

  if (hash !== '') {
    setTimeout(() => {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) element.scrollIntoView()
    }, 0)
  }
}

const routes = () => (
  <Router history={browserHistory} onUpdate={hashLinkScroll}>
    <Route path="/" component={HomeContainer} />
    <Route path="/en" component={HomeContainer} />

    <Route path="/faq" component={FAQContainer} />
    <Route path="/en/faq" component={FAQContainer} />

    <Route path="/after/:after" component={HomeContainer} />
    <Route path="/en/after/:after" component={HomeContainer} />

    <Route path="/meetup/*" component={MeetupContainer} />
    <Route path="/en/meetup/*" component={MeetupContainer} />

    <Route path="/partenaires" component={SponsorsContainer} />
    <Route path="/en/sponsors" component={SponsorsContainer} />

    <Route path="/propositions/sujet" component={TalkSubmissionContainer} />
    <Route path="/en/submission/talk" component={TalkSubmissionContainer} />

    <Route path="/*search" component={SearchContainer} />

    <Route path="*" component={PageError} />
  </Router>
)

export default createApp(routes)

if (module.hot) {
  module.hot.accept(() => renderApp(routes))
}
