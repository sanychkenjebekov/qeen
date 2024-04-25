import Accordion from '@/shared/ui/Accordion';
import { faq } from './fqa.constants';

export const FAQ = () => {
    return (
        <main className="flex flex-col max-container gap-[80px] mt-[20px]">
            <section className="max-w-[1440px] p-5 sm:mx-8 sm:p-10 bg-secondary rounded-[30px]">
                <h1 className="text-base sm:text-2xl font-semibold text-center mb-8">
                    Часто задаваемые вопросы
                </h1>
                <ul className="text-primary">
                    {faq.map((el, i) => (
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        <Accordion key={i} label={el.label} desc={el.desc} />
                    ))}
                </ul>
            </section>
        </main>
    );
};
