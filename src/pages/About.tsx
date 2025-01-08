import {FC, useState} from 'react'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";


const AboutUs: FC = () => {
    const staff = [
        ["/SafeEyes/assets/Adilzhan.png", "Ахметкерей Әділжан", "CEO", "two-time Top 3 Tourism Hackathon", "Three-times AITU Icode finalist"],
        ["/SafeEyes/assets/Iliyas.png", "Тілеужан Ілияс", "CTO", "1st Place WRO 2022,  John Hopkin's CTY’23", "one-time Top 3 Tourism Hackathon"],
        ["/SafeEyes/assets/Sara.png", "Сайранова Сара", "Исследователь", "1st place International science projects competition Kurbatov", "1st place Republican science projects conference organised by KazNU"],
        ["/SafeEyes/assets/rasul.png", "Абуов Расул", "COO", "Rise Сhallenge Finalist 2024", "Exhibitor at Digital Almaty and Digital Bridge 2023"],
        ["/SafeEyes/assets/Aisultan.png", "Бақтығали Айсұлтан", "COO", "Rise Сhallenge Finalist 2024", "Exhibitor at Digital Almaty and Digital Bridge 2023"],
        ["/SafeEyes/assets/Aizhanq.png", "Абуова Айжан", "Исследователь", "", ""],
        ["/SafeEyes/assets/akan.png", "Қайырбай Ақансері", "Frontend-developer", "", ""],
        ["/SafeEyes/assets/Zanghar.png", "Қасенғазы Заңғар", "ML-engineer", "", ""],
        ["/SafeEyes/assets/Yerdaulet.png", "Өмірзақ Ердәулет", "ML-engineer", "", ""]
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
            <div className="flex h-5/6 overflow-x-auto items-center justify-center space-x-6 px-10">
                <div onClick={decrease} className="flex flex-col shadow-lg h-fit justify-center items-center whitespace-normal rounded-md px-3 py-2">
                    <FaArrowLeft className='w-[30px] h-[30px]'/>
                </div>
                <div className="flex flex-col shadow-lg h-full justify-evenly items-center whitespace-normal rounded-md px-3 py-2">
                    <div className="w-[350px] h-[350px] mb-10 rounded-full">
                        <img src={staff[index][0]} alt="" className="w-full h-full object-fill rounded-full" />
                    </div>
                    <h3 className="text-center mb-5 font-bold">{staff[index][1]}</h3>
                    <h5 className="text-blue-300 text-center mb-5">{staff[index][2]}</h5>    
                    <h4 className="text-blue-300 text-center mb-5">{staff[index][3]}</h4>    
                    <h4 className="text-blue-300 text-center mb-5">{staff[index][4]}</h4>    
                </div>
                <div onClick={increase} className="flex flex-col shadow-lg h-fit justify-center items-center whitespace-normal rounded-md px-3 py-2">
                    <FaArrowRight className='w-[30px] h-[30px]' />    
                </div>
            </div>
        </div>
    )
}

export default AboutUs