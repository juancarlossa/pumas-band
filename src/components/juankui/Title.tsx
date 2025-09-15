
import { COLOR } from "@/consts";
import { Highlighter } from "../magicui/highlighter";
import { TextAnimate } from "../ui/text-animate";

export function Title({ title, subtitle }: { title: string, subtitle: string }) {
    return (

        <div className="flex flex-col justify-center items-center">
            <Highlighter action="highlight" color={COLOR} animationDuration={1000}>
                <TextAnimate animation="blurIn" as="h2" className="text-4xl md:text-5xl lg:text-6xl text-white">{title}</TextAnimate>
            </Highlighter>
            <TextAnimate animation="blurIn" as="p" delay={0.5} className="max-w-2xl text-center text-lg md:text-xl lg:text-xl py-5">{subtitle}</TextAnimate>
        </div>
    );
};
