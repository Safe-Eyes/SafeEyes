import {FC} from 'react'
import { Link } from 'react-router-dom'

const ErrorPage: FC = () => {
  return (
    <div className='h-screen w-full bg-[#16171B] font-montserrat text-white/50 flex justify-center items-center flex-col gap-10'>
      <div className='flex flex-col black items-center'>
        <h1 className='text-4xl mb-4'>404</h1>
        <h1>NOT FOUND ERROR</h1>
      </div>
      <Link to={"/"} className='bg-[#16171B] px-6 py-2 mt-11 rounded-sm border border-white/50'>Back</Link>
    </div>
  )
}

export default ErrorPage