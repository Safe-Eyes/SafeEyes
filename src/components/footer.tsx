import { FC } from "react";

const Footer: FC = () => {
    return (
        <div className="bg-gray-800 h-80 flex text-white py-6 text-center justify-evenly">
            <div className="flex flex-col justify-center items-start">
                <h1 className="black font-bold text-3xl mb-20">SafeEyes</h1>
                <h6 className="text-white/50">© 2025 ТОО «SafeEyes». </h6>
                <h6 className="text-white/50">Все права защищены.</h6>
            </div>
            <div className="flex flex-col justify-center items-start">
                <h4 className="text-white mb-10">Контакты</h4>
                <h4 className="text-white/50">safeeyes@gmail.com</h4>
                <h4 className="text-white/50 mt-2">Актау, 33 мкр, НИШ</h4>
                <h4 className="mt-8 text-white/50">8 701 770 0633</h4>
            </div>
            <div className="flex flex-col justify-center items-start">
                <h4 className="text-white justify-start">Оставьте свой email и мы свяжемся с вами</h4>
                <input className="w-fit rounded-md px-3 py-2 mt-4" type="text" placeholder="Ваш email:"/>
                <div className="w-fit mt-4 h-fit px-5 py-3 bg-blue-300 rounded-full text-white">Отправить</div>
            </div>
        </div>
    )
}

export default Footer