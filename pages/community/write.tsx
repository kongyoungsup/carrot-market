import type { NextPage } from "next";
import Button from '@components/Button';
import Layout from '@components/Layout';
import TextArea from '@components/TextArea';

const Write: NextPage = () => {
  return(
    <Layout canGoBack title="Write Post">
      <form className="px-4 py-10">
        <TextArea placeholder='질문을 작성해 주세요..' required/>
        <Button title='submit' />
      </form>
    </Layout>
  )
}

export default Write;