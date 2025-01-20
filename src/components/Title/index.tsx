interface TitlePropsType {
    title:string
}
const Title = ({title}:TitlePropsType) => {
    return ( 
        <div className="flex gap-1 justify-start items-center">
            <div className="h-2 w-2 rounded-full bg-neutral-800"></div>
            <div className={`w-fit text-lg font-semibold uppercase text-white`}>{title}</div>
            <div className="h-px grow bg-neutral-800"></div>
        </div>
     );
}
 
export default Title;