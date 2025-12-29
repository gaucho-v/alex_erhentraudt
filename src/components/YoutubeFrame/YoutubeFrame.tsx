import {Flex} from "antd";


export const YoutubeFrame = ({ link }: { link?: string}) => {
    return (
        <Flex style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <iframe
                width={'100%'}
                height="315"
                src={link}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen>
            </iframe>
        </Flex>
    )
}