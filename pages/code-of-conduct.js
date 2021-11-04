import CodeOfConductContainer from '../components/CodeOfConductContainer'
import { getCodeOfConductData } from '../lib/codeOfConduct'

export default CodeOfConductContainer

export async function getStaticProps() {
  const { title, body } = await getCodeOfConductData()
  return {
    props: {
      title,
      body,
    },
  }
}
