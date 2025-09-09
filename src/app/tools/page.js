import { YtConverter } from "./yt-converter";

export const metadata = {
    title: 'Music Converter',
    description: 'Convert YT to MP3',
}

export default function ConverterPage() {
    return (<YtConverter />);
}