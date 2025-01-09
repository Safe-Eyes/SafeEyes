import { FC } from "react";

const Home: FC = () => {
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col">
      <div className="min-h-screen w-full flex flex-col lg:flex-row justify-evenly items-center px-10">
        <div className="flex flex-col items-center text-center lg:text-left lg:items-start">
          <h1 className="text-4xl font-bold">Ваш надежный ИИ помощник</h1>
          <h2 className="text-2xl mt-8 lg:mt-4">Сохраняем жизни работников и заботимся об их безопасности</h2>
          <button
            onClick={handleScrollToBottom}
            className="w-fit mt-10 lg:mt-20 px-5 py-3 bg-blue-300 rounded-full text-white"
          >
            Свяжитесь с нами
          </button>
        </div>
        <div className="mt-10 lg:mt-0">
          <img
            src="/SafeEyes/assets/back.png"
            className="hidden lg:block"
            width={400}
            height={400}
          />
        </div>
      </div>

      <div className="bg-slate-100 py-20">
        <h2 className="text-4xl text-center mb-10">Что мы предлагаем?</h2>
        <div className="flex flex-col lg:flex-row items-stretch justify-center space-y-6 lg:space-y-0 lg:space-x-6 px-10">
          <div className="flex flex-col shadow-lg rounded-md px-3 pt-2 pb-4 bg-white">
            <div className="w-[320px] h-[320px] my-6 mx-auto">
              <img
                src="/SafeEyes/assets/ppe.png"
                alt="PPE Detection"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-center font-bold mb-4">
              Распознование средств индивидуальной защиты
            </h3>
            <p className="text-blue-300 text-center">
              Автоматическое обнаружение отсутствия касок, жилетов и другой
              защитной экипировки
            </p>
          </div>

          <div className="flex flex-col shadow-lg rounded-md px-3 pt-2 pb-4 bg-white">
            <div className="w-[320px] h-[320px] my-6 mx-auto">
              <img
                src="/SafeEyes/assets/fires.png"
                alt="Fire Detection"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-center font-bold mb-4">Обнаружение пожаров</h3>
            <p className="text-blue-300 text-center">
              Предупреждение о воспламенении с минимальными задержками
            </p>
          </div>

          <div className="flex flex-col shadow-lg rounded-md px-3 pt-2 pb-4 bg-white">
            <div className="w-[320px] h-[320px] my-6 mx-auto">
              <img
                src="/SafeEyes/assets/performances.png"
                alt="Performance Monitoring"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-center font-bold mb-4">
              Наблюдение за производительностью работников
            </h3>
            <p className="text-blue-300 text-center">
              Если вам нужно формировать какие либо отчеты или другие документы
              на основании данных
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;