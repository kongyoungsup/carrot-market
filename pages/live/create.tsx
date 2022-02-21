import react from 'react';
import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/Layout';
import TextArea from '@components/TextArea';

function Create() {
  return(
    <Layout canGoBack>
    <div className='flex flex-col p-4 py-10 space-y-5'>
      <Input label='name' title='name' kind='text' type='text' />
      <Input label='name' title='price'kind='price' type='text'  />
      <TextArea titleTrue title='Description' row={5} label='textarea' placeholder='text...' />
      <Button title='Go live' />
    </div>
    </Layout>
  )
}

export default Create;