import FAQContainer from '../components/FAQContainer'
import { getFaqData } from '../lib/faq'

export default FAQContainer

export async function getStaticProps({ locale }) {
  const { title, body } = await getFaqData({ locale })
  return {
    props: {
      title,
      body,
    },
  }
}
