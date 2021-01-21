import { Octokit } from '@octokit/rest'

export function initGithubAuthentication() {
  try {
    /**
     * Use OAuth proxy https://auth-server.herokuapp.com
     * See with PierrickP
     */
    window.hello.init(
      {
        github: 'Iv1.558c5d3bf74f6921',
      },
      {
        redirect_uri: 'https://parisjs.org/propositions/sujet/',
      }
    )
  } catch (e) {}

  // get stored credentials
  const parsedData = JSON.parse(localStorage.getItem('hello') || 'null')

  if (parsedData?.github) {
    const { access_token, expires } = parsedData.github
    const now = new Date().getTime() / 1000
    if (access_token && expires > now) {
      return access_token
    }
  }
  return null
}

export function signinToGitHub() {
  return window.hello('github').login({
    scope: 'public_repo',
  })
}

export function createGitHubIssue({ githubToken, formData }) {
  const gh = new Octokit({ auth: githubToken })

  return gh.issues.create({
    owner: 'parisjs',
    repo: 'talks',
    title: formData.title,
    body: formatTalkSubmission(formData),
  })
}

function formatTalkSubmission({
  title,
  kind,
  description,
  slideLink = '',
  projectLink = '',
  twitter = '',
}) {
  const formattedDescription = description.replace(/(.+)/g, '> $1')
  return `## ${title}

    *Talk format :* ${kind}
  
    *Description :*
  
    ${formattedDescription}
  
    *Slides :* ${slideLink}
    *Projet :* ${projectLink}
    *Twitter :* ${twitter}`.replace(/^\s+/g, '')
}
