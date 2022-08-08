import { GamingNewsArticle, IconProps } from "@lib/types";
import React, { useEffect, useState } from "react";
import { MOCK_NEWS_RESPONSE } from "src/TS/resource-data";
import { sleep } from "src/TS/utils";

function Component({ Icon }: IconProps) {
    const [articles, setArticles] = useState<GamingNewsArticle[]>([]);
    const [loaded, setLoaded] = useState<boolean | string>(false);

    useEffect(() => {
        const getNews = async () => {
            if (process.env.NODE_ENV === "development") {
                setArticles(MOCK_NEWS_RESPONSE.news);
                setLoaded(true);
                return;
            }

            fetch("/bbc-articles")
                .then((data) => data.json())
                .then((data) => {
                    setArticles(data.gaming);
                })
                .catch((e) => {
                    setLoaded("Failed");
                    sleep(5000).then(getNews);
                });
        };

        getNews();
    }, []);

    return (
        <div
            className={`col-span-1 w-full rounded-lg shadow-inner border border-slate-300 bg-slate-100`}
        >
            <div className="px-2 flex justify-between bg-white rounded-lg shadow z-50">
                <div className="flex-1 truncate">
                    <h1 className="mt-2 p-2 font-semi-bold">News</h1>
                    <hr className="-mt-2 border-default w-full" />
                </div>
            </div>
            <div className="max-h-96 overflow-auto">
                <div className="w-full">
                    <div
                        id="articles_container"
                        className="articles divide-y overscroll-auto w-full px-4 grid grid-cols-1 grid-rows-auto"
                    >
                        {articles.map((data) => (
                            <a
                                className="group w-full p-2 group flex"
                                href={data.link}
                            >
                                <div className="group w-full flex flex-col justify-between">
                                    <img
                                        src={data.img}
                                        alt={data.title}
                                        className="animate__animated animate__fadeIn self-center rounded-lg my-2 w-4/5 shadow"
                                    />
                                    <div className="flex flex-row justify-left items-center text-blue-500 group-hover:text-blue-700">
                                        <div className="min-w-32 w-1/8">
                                            <Icon.RightCornerArrow />
                                        </div>
                                        <div className="flex flex-col w-7/8">
                                            <h3
                                                dangerouslySetInnerHTML={{
                                                    __html: data.title,
                                                }}
                                                className="group-hover:underline ml-2 text-md leading-tight sm:leading-normal"
                                            ></h3>
                                            <p className="ml-2 text-xs leading-none">
                                                {data.date}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Component;
