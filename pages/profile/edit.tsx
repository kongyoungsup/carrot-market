import type { NextPage } from "next";
import Button from '@components/Button';
import Input from '@components/Input';
import useUser from '@libs/client/useUser';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import Layout from '@components/Layout';
import useMutation from '@libs/client/useMutation';
import cfUrl from '@libs/client/imgUrl';

interface TypeUserdata {
  name: string;
  email: string;
  phone: string;
  avator: FileList;
  formErrors: string;
}

interface TypeCheck {
  [key: string] : string
}

const EditProfile: NextPage = () => {

  const { user, isLoding } = useUser()
  const { register, handleSubmit, setValue, setError, watch, formState: { errors }  } = useForm<TypeUserdata>()
  const [ editProfile, { data, loading } ] = useMutation<TypeCheck>('/api/users/me')
  const [avatorPreview, setAvatorPreview] = useState< string>();

  useEffect(() => {
    if(user?.name) setValue('name', user?.name);
    if(user?.email) setValue('email', user?.email);
    if(user?.phone) setValue('phone', user?.phone);
    if(user?.avator) setAvatorPreview(cfUrl({id: user?.avator ,variant: 'avator'}));
  }, [user, setValue]);


  const avatorVar = watch('avator');
  console.log(avatorVar);
  

  useEffect(() => {
    if(avatorVar && avatorVar.length > 0) {
      const file = avatorVar[0];
      setAvatorPreview(URL.createObjectURL(file));
    }
  }, [avatorVar]);

  const onValid = async ({name, email, phone, avator}: TypeUserdata) => { 
    
    if (loading) return

    if (email === '' && phone === '') {
      return setError('formErrors',{
        message: '이메일이나 전화번호 중 하나는 입력해야 합니다.'
      });
    }

    if ( avator && avator.length > 0 && user) {
      
      const cloudFlareRequest = await (await fetch('/api/files')).json();
      console.log(cloudFlareRequest);
      
      const form = new FormData();
      form.append('file', avatorVar[0], `userProf_${user.id}`);

      console.log(form);
      
      const { result: { id } } = await (await fetch(cloudFlareRequest.result.uploadURL,{
        method: "POST",
        body: form
      })).json();

      editProfile({name, email, phone, avatorId: id});
    }

    editProfile({name, email, phone});


    // 프론트에서 처리 form 값과 세션user 의 값이 같다면, " "
    // editProfile({
    //   name, 
    //   email: (email !== user?.email) ? email : "" , 
    //   phone: (phone !== user?.phone) ? phone : "" , 
    // });

    }

    // watch 



  return (
    <Layout canGoBack hasTabBar>
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        {/* <span>{errors}</span> */}
        <div className="flex items-center space-x-3">
          <img src={avatorPreview} className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input {...register('avator')} id="picture" type="file" className="hidden" accept="image/*" />
          </label>
        </div>
        
          <Input formReg={register('name')} label='name' title='name' kind='text' />
          { loading ? null : (
            !data ? null : { 
              same : null,
              update : <span className='text-blue-500'>닉네임이 업데이트 되었습니다.</span>,
            }[data.nameCheck]
          )}

          <Input formReg={register('email')} label='email' title='Email address' kind='email' />
          { loading ? null : (
            !data ? null : { 
              same : null,
              already : <span className='text-red-500'>존재하는 전화번호 입니다.</span>,
              update : <span className='text-blue-500'>전화번호가 업데이트 되었습니다.</span>,
            }[data.emailCheck]
          )}
          
          
          <Input formReg={register('phone')} label='phone' title='Phone number' kind='phone' />
          { loading ? null : (
            !data ? null : { 
              same : null,
              already : <span className='text-red-500'>존재하는 전화번호 입니다.</span>,
              update : <span className='text-blue-500'>전화번호가 업데이트 되었습니다.</span>,
            }[data.phoneCheck]
          )}

          {/* { 
            loading 
            ? null
            : ( data
              ? ( data?.phoneCheck 
                ? <span className='text-blue-500'>전화번호가 업데이트 되었습니다.</span> 
                : <span className='text-red-500'>존재하는 전화번호 입니다.</span>  )
              : null )
          } */}

          {errors.formErrors ? 
           <span className='block text-center text-red-500'>{errors.formErrors?.message}</span>
          : null }

          <Button title={loading? 'Updating...' : 'Update profile'} />
          
      </form>
    </Layout>
  )
}

export default EditProfile;

