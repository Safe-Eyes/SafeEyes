import {FC, useState} from 'react'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";


const AboutUs: FC = () => {
    const staff = [
        ["/SafeEyes/assets/Adilzhan.png", "Ахметкерей Әділжан", "CEO"],
        ["/SafeEyes/assets/Iliyas.png", "Тлеужан Ілияс", "Разработчик в области машинного обучения и компьютерного зрения"],
        ["/SafeEyes/assets/Sara.png", "Сайранова Сара", "Исследователь"],
        ["/SafeEyes/assets/rasul.png", "Абуов Расул", "Разработчик в области машинного обучения и компьютерного зрения"],
        ["/SafeEyes/assets/Aisultan.png", "Бақтығали Айсұлтан", "CPO"],
        ["/SafeEyes/assets/Aizhanq.png", "Абуова Айжан", "Исследователь"],
        ["/SafeEyes/assets/akan.png", "Қайырбай Ақансері", "Frontend developer"],
        ["/SafeEyes/assets/Zanghar.png", "Қасенғазы Заңғар", "Fullstack developer"],
        ["/SafeEyes/assets/Yerdaulet.png", "Өмірзақ Ердәулет", "Исследователь"]
    ];
    const [index, setIndex] = useState<number>(0);
    const increase = () => {
        setIndex((index + 1) % 9)
    }
    const decrease = () => {
        if (index == 0) {
            setIndex(8)
        } else {
            setIndex(index - 1)
        }
    }
    return (
        <div className="h-screen flex flex-col items-center justify-center mb-10">
            <div className="text-4xl h-1/6 mt-10">Наша команда</div>
            <div className="flex h-5/6 overflow-x-auto items-center justify-center space-x-6 px-2 lg:px-10">
                <div onClick={decrease} className="flex flex-col shadow-lg h-fit justify-center items-center whitespace-normal rounded-md px-3 py-2">
                    <FaArrowLeft className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]'/>
                </div>
                <div className="flex flex-col shadow-lg max-w-60 max-h-192 lg:max-w-80 h-full justify-evenly items-center rounded-md px-3 py-2">
                    <div className="w-[220px] h-[220px] lg:w-[300px] lg:h-[300px] mb-10 rounded-full">
                        <img src={staff[index][0]} alt="" className="w-full h-full object-fill rounded-full" />
                    </div>
                    <h3 className="text-center text-2xl mb-2 font-bold">{staff[index][1]}</h3>
                    <h5 className="text-blue-300 font-bold text-center mb-2">{staff[index][2]}</h5>    
                </div>
                <div onClick={increase} className="flex flex-col shadow-lg h-fit justify-center items-center whitespace-normal rounded-md px-3 py-2">
                    <FaArrowRight className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]' />    
                </div>
            </div>
        </div>
    )
}

export default AboutUs