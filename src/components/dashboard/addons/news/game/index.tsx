import { GamingNewsArticle, IconProps } from "@lib/types";
import React, { useEffect, useState } from "react";
import { MOCK_NEWS_RESPONSE } from "src/TS/resource-data";
import { sleep } from "src/TS/utils";

function Component({ Icon }: IconProps) {
    const [articles, setArticles] = useState<GamingNewsArticle[]>([]);
    const [loaded, setLoaded] = useState<boolean | string>(false);
    const [articlePage, setArticlePage] = useState<number>(0);

    useEffect(() => {
        const getNews = async () => {
            if (process.env.NODE_ENV === "development") {
                setArticles(MOCK_NEWS_RESPONSE.gaming);
                setLoaded(true);
                return;
            }

            fetch("/game-articles")
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

    const handleRotation = (index: number) => {
        if (index === articles.length) {
            return setArticlePage(0);
        }
        if (index < 0) {
            return setArticlePage(articles.length - 1);
        }
        setArticlePage(index);
    };

    return (
        <div className="col-span-3 xl:col-span-2">
            <div className="flex flex-col w-full items-center justify-center p-4">
                {loaded ? (
                    articles.map((data, index) => (
                        <a
                            href={data.link}
                            rel="noreferrer"
                            target="_blank"
                            className={`rounded-xl ${
                                index === articlePage ? "flex" : "hidden"
                            } flex-col bg-white shadow-md`}
                        >
                            <div className="-mt-1">
                                <img
                                    src={data.img}
                                    alt={data.title}
                                    className="rounded-t-xl w-full h-48 md:w-2xl md:h-92 shadow-inner"
                                />
                            </div>
                            <div className="rounded-xl shadow p-3 xl:p-5 h-24 md:w-2xl flex flex-col justify-between overflow-auto">
                                <h1 className="font-semibold uppercase text-sm">
                                    {data.title}
                                </h1>
                                <span className="text-xs text-blue-700">
                                    {data.date}
                                </span>
                            </div>
                        </a>
                    ))
                ) : (
                    <p>Loading bar</p>
                )}
                <div className="px-4 w-full mb-4 ">
                    <div className="flex justify-center -mt-2">
                        <div className="flex w-3/4 xl:w-1/2 p-4 justify-between h-12 lg:h-fit">
                            <button
                                className="hidden xl:block text-slate-500 border-slate-500 hover:text-blue-500 border hover:border-blue-500 rounded-xl duration-150 hover:scale-105 active:scale-95"
                                onClick={() => handleRotation(articlePage - 1)}
                            >
                                <Icon.LeftArrow />
                            </button>
                            {loaded &&
                                articles.map((data, index) => (
                                    <button
                                        onClick={() => handleRotation(index)}
                                        className={`transition-all w-4 self-center duration-150 hover:scale-150 active:scale-125 ease-in-out rounded-md p-1 ${
                                            index === articlePage
                                                ? "bg-blue-500 h-4"
                                                : "bg-slate-300 h-2"
                                        } shadow`}
                                    />
                                ))}
                            <button
                                className="hidden xl:block text-slate-500 border-slate-500 hover:text-blue-500 border hover:border-blue-500 rounded-xl duration-150 hover:scale-105 active:scale-95"
                                onClick={() => handleRotation(articlePage + 1)}
                            >
                                <Icon.RightArrow />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between md:hidden w-full -mt-2">
                        <button
                            className="rounded border w-full ml-2 p-2 border-blue-700 text-blue-700 bg-gradient-to-r active:from-blue-600 active:to-blue-900 active:text-white"
                            onClick={() => handleRotation(articlePage - 1)}
                        >
                            Previous
                        </button>
                        <button
                            className="rounded border w-full ml-2 p-2 border-blue-700 text-blue-700 bg-gradient-to-r active:from-blue-900 active:to-blue-600 active:text-white"
                            onClick={() => handleRotation(articlePage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Component;
