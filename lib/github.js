import { Octokit } from '@octokit/rest'

export function initGithubAuthentication() {
  try {
    /**
     * Use OAuth proxy https://auth-server.herokuapp.com
     * See with PierrickP
     */
    window.hello.init(
      {
        github: process.env.NEXT_PUBLIC_GITHUB_APP_ID,
      },
      {
        redirect_uri: window.location.href,
        oauth_proxy: process.env.NEXT_PUBLIC_GITHUB_OAUTH_PROXY
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
    owner: process.env.NEXT_PUBLIC_GITHUB_TALK_REPO_OWNER,
    repo: process.env.NEXT_PUBLIC_GITHUB_TALK_REPO_NAME,
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
