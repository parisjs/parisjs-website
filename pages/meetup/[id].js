import { getAllMeetupIds, getMeetupData, getTwitterAvatars } from '../../lib/meetups'
import { Meetup } from '../../components/MeetupContainer'

export default Meetup

export async function getStaticPaths() {
  const paths = (await getAllMeetupIds()).flatMap((id) => [
    `/en/meetup/${id}`,
    `/meetup/${id}`,
  ])
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const twitterAvatars = await getTwitterAvatars()
  const meetup = await getMeetupData(params.id, twitterAvatars)
  return {
    props: {
      meetup,
    },
  }
}
