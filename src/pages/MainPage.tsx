import { FC } from "react";

const Home: FC = () => {
  return (
    <div className="flex flex-col">
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex flex-col">
            <h1 className="text-4xl mt-4 font-bold">Ваш надежный ИИ помощник</h1>
            <h2 className="text-2xl mt-4">Помогаем спасать жизни работников</h2>
            <div className="w-fit mt-20 h-fit px-5 py-3 bg-blue-300 rounded-full text-white">Свяжитесь с нами</div>
        </div>
        <div>
            <img src=""/>
        </div>
      </div>

      <div className="h-screen flex flex-col items-center bg-slate-100">
        <div className="text-4xl h-1/5 mt-10">Что мы предлагаем?</div>
        <div className="flex h-4/5 items-stretch justify-center align-center space-x-6 px-10 mb-10">
            <div className="flex flex-col shadow-lg h-full justify-evenly items-center whitespace-normal rounded-md px-3 py-2">
                <div className="w-[350px] h-[350px] mb-10">
                    <img src="src/assets/ppe.png" alt="" className="w-full h-full object-fill rounded-lg" />
                </div>
                <h3 className="text-center mb-5">Распознование средств индивидуальной защиты</h3>
                <h5 className="text-blue-300 text-center mb-5">
                    Если вам нужно распознавать какие либо объекты с изображений или камер
                </h5>
            </div>
            <div className="flex flex-col shadow-lg h-full justify-evenly items-center whitespace-normal rounded-md px-3 py-2">
                <div className="w-[350px] h-[350px] mb-10"><img src="src/assets/fires.png" alt="" className="w-full h-full object-fill rounded-lg"/></div>
                <h3 className="text-center mb-5">Обнаружение пожаров</h3>
                <h5 className="text-blue-300 text-center mb-5">Если вам нужно предсказать какое либо событие или составить оптимальный план</h5>
            </div>
            <div className="flex flex-col shadow-lg h-full justify-evenly items-center whitespace-normal rounded-md px-3 py-2">
                <div className="w-[400px] h-[350px] mb-10"><img src="src/assets/performances.png" alt="" className="w-full h-full object-fill rounded-lg"/></div>
                <h3 className="text-center mb-5">Наблюдение за производительностью работников</h3>
                <h5 className="text-blue-300 text-center mb-5">Если вам нужно формировать какие либо отчеты или другие документы на основании данных</h5>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;