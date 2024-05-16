import { notFound } from "next/navigation";
import { getPage } from "../../../api/page"
import { Suspense } from "react";
import Loading from "./loading";
import { firstLevelMenu } from "../../../helpers/helpers";

export default async function TopPage({ params }: { params: { alias: string[] } }) {
    const page = await getPage(params.alias[1]);
    
    if(!page) {
        return {
            notFound: true
        }
    }

    const firstCategoryItem = firstLevelMenu.find(m => m.route ==  params.alias[0]);
    
    if(!firstCategoryItem) {
        return {
            notFound: true
        }
    }

    return (
        <Suspense fallback={<Loading />}>
            <div>
                {page?.title}
            </div>
        </Suspense>  
    )
  }