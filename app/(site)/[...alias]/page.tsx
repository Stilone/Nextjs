import { notFound } from "next/navigation";
import { getPage } from "../../../api/page"

export default async function PageProducts({ params }: { params: { alias: string[] } }) {
    const page = await getPage(params.alias[1]);
    
    if(!page) {
        notFound();
    }

    return (
        <div>
            {page.title}
        </div>
    )
  }