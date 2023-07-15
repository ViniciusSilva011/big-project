import Image from "next/image";


// TODO: add TypeHtml when db is set
enum TypeHtml {
    Line,
    Block,
    Reference
}


interface IProps {
    name: string, 
    avatar: string
}

const Show = ({ name, avatar, }: IProps) => {

    return (
        <div className="flex items-center justify-center gap-2">
            <Image src={avatar} className="h-6 w-6 rounded-full" alt={"profile picture"} width="25" height="25" />
            <span>
                {name}
            </span>
        </div>
    );
}

export default Show;