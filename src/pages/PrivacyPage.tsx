import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteFooter from "@/components/sections/SiteFooter";

const PrivacyPage = () => {
  const today = new Date().toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });

  useEffect(() => {
    document.title = "Политика конфиденциальности — ООО «Фаворит»";
  }, []);

  return (
    <div className="page-enter">
      <main className="min-h-screen pt-8 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-accent hover:underline text-sm mb-6"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>

          <div className="rounded-2xl border border-accent/20 bg-card/60 backdrop-blur-sm p-6 sm:p-10">
            <h1 className="text-2xl sm:text-4xl font-display font-black tracking-tighter mb-2">
              Политика конфиденциальности
            </h1>
            <p className="text-muted-foreground text-sm mb-8">
              Действует с {today} · ООО «Фаворит», ИНН 5250077990
            </p>

            <div className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-white font-bold text-lg sm:text-xl mb-2">1. Общие положения</h2>
                <p>
                  Настоящая Политика разработана в соответствии с Федеральным законом № 152-ФЗ
                  «О персональных данных» и определяет порядок обработки персональных данных
                  пользователей сайта фаварит.рф (далее — «Сайт»), оператором которого является
                  ООО «Фаворит» (далее — «Оператор»).
                </p>
              </section>

              <section>
                <h2 className="text-white font-bold text-lg sm:text-xl mb-2">2. Какие данные мы собираем</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Имя или название компании (которое вы указываете в форме);</li>
                  <li>Контактный телефон;</li>
                  <li>Электронная почта (если указали);</li>
                  <li>Комментарий к заявке (характер груза, адреса, пожелания);</li>
                  <li>Технические данные: IP-адрес, тип браузера, источник перехода (через Яндекс.Метрику).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-white font-bold text-lg sm:text-xl mb-2">3. Цели обработки</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Связаться с вами по заявке на аренду техники;</li>
                  <li>Согласовать условия и подать манипулятор;</li>
                  <li>Отправить реквизиты, договор или счёт;</li>
                  <li>Улучшить работу Сайта (анонимная аналитика).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-white font-bold text-lg sm:text-xl mb-2">4. Согласие на обработку</h2>
                <p>
                  Отправляя любую форму на Сайте (заявка, обратный звонок, заказ реквизитов),
                  вы подтверждаете, что ознакомлены с настоящей Политикой и даёте Оператору
                  согласие на обработку указанных вами персональных данных.
                </p>
              </section>

              <section>
                <h2 className="text-white font-bold text-lg sm:text-xl mb-2">5. Передача третьим лицам</h2>
                <p>
                  Мы не продаём и не передаём ваши данные третьим лицам, за исключением случаев,
                  предусмотренных законодательством РФ. Для аналитики используется сервис
                  Яндекс.Метрика — он работает с обезличенными данными.
                </p>
              </section>

              <section>
                <h2 className="text-white font-bold text-lg sm:text-xl mb-2">6. Хранение и защита</h2>
                <p>
                  Данные хранятся на защищённых серверах не дольше, чем требуется для целей
                  обработки. Оператор применяет технические и организационные меры для защиты
                  информации от несанкционированного доступа.
                </p>
              </section>

              <section>
                <h2 className="text-white font-bold text-lg sm:text-xl mb-2">7. Ваши права</h2>
                <p>
                  Вы можете в любой момент отозвать согласие на обработку персональных данных,
                  запросить уточнение, удаление или блокировку ваших данных. Для этого свяжитесь
                  с нами по почте{" "}
                  <a href="mailto:Avrora.888@bk.ru" className="text-accent hover:underline">
                    Avrora.888@bk.ru
                  </a>{" "}
                  или по телефону{" "}
                  <a href="tel:+79601690990" className="text-accent hover:underline whitespace-nowrap">
                    +7 960 169-09-90
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="text-white font-bold text-lg sm:text-xl mb-2">8. Контакты Оператора</h2>
                <p>
                  ООО «Фаворит»<br />
                  ИНН 5250077990 / ОГРН 1235200013531<br />
                  Адрес: 607657, Нижегородская область, г. Кстово, 6-й м-он, д. 2, оф. 13<br />
                  Email: <a href="mailto:Avrora.888@bk.ru" className="text-accent hover:underline">Avrora.888@bk.ru</a><br />
                  Телефон: <a href="tel:+79601690990" className="text-accent hover:underline whitespace-nowrap">+7 960 169-09-90</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default PrivacyPage;