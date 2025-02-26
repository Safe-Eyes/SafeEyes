import { FC } from "react";
import { toast } from "react-toastify";

const Footer: FC = () => {
    const sendEmail = () => {
        toast.success('Спасибо. Email был успешно отправлен. Мы свяжемся с вами в течении 3-4 дней!')
    }
    return (
        <div className="bg-gray-600 flex flex-col lg:flex-row h-full text-white py-6 text-center items-center lg:justify-evenly">
            <div className="flex flex-col justify-center lg:items-start items-center">
                <div className="flex flex-col items-center">
                    <img src="/SafeEyes/assets/logo.png" alt="" width={50} height={50}/>
                    <h1 className="black font-bold text-3xl mb-10 lg:mb-20 mt-2">SafeEyes</h1>
                </div>
                <h6 className="text-white/50">© 2025 ТОО «SafeEyes». </h6>
                <h6 className="text-white/50 mt-2 lg:mt-0">Все права защищены.</h6>
            </div>
            <div className="flex flex-col justify-center items-center lg:items-start mt-10 lg:mt-0">
                <h4 className="text-white mb-5 lg:mb-10">Контакты</h4>
                <h4 className="text-white/50">safeeyes@gmail.com</h4>
                <h4 className="text-white/50 mt-2">Актау, 33 мкр, НИШ</h4>
                <h4 className="mt-4 text-white/50">8 701 770 0633</h4>
            </div>
            <div className="flex flex-col justify-center items-center lg:items-start mt-4 lg:mt-0">
                <h4 className="text-white justify-start">Оставьте свой email и мы свяжемся с вами</h4>
                <input className="w-fit rounded-md px-3 py-2 mt-4 text-black" type="text" placeholder="Ваш email:"/>
                <div className="w-fit mt-4 h-fit px-5 py-3 bg-blue-300 rounded-full text-white" onClick={sendEmail}>Отправить</div>
            </div>
        </div>
    )
}

export default Footer