import { NewsArticle, NewsCarousel } from "@lib/types";
import React, { useEffect, useState } from "react";
import { sleep } from "src/TS/utils";

function Component({
    Icon,
    Endpoint,
    MockData,
    SiteName,
    Disabled,
}: NewsCarousel) {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loaded, setLoaded] = useState<boolean | string>(false);
    const [articlePage, setArticlePage] = useState<number>(0);

    const handleRotation = (index: number) => {
        if (index === articles.length) {
            return setArticlePage(0);
        }
        if (index < 0) {
            return setArticlePage(articles.length - 1);
        }
        setArticlePage(index);
    };

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            if (MockData) {
                setArticles(MockData);
            } else {
                setArticles([
                    {
                        title: "Generic News Title",
                        link: "/news-link",
                        img: "/img-link",
                        date: "01/01/1999",
                        site: "newssite",
                    },
                ]);
            }
            setLoaded(true);
            return;
        }

        const getNews = async () => {
            fetch(Endpoint)
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
    }, [Endpoint, MockData]);

    return (
        <div className="my-3 px-6 w-full lg:w-auto">
            <div className="text-left flex flex-col w-full items-center justify-center xl:p-4 xl:border border-gray-300 rounded-xl">
                {loaded ? (
                    articles.map((data, index) => (
                        <a
                            href={data.link}
                            rel="noreferrer"
                            target="_blank"
                            className={`
                                ${index === articlePage ? "flex" : "hidden"} 
                                ${Disabled && "pointer-events-none"} 
                                w-full lg:w-auto rounded-xl flex-col xl:flex-row bg-white shadow-md transition-all duration-100 hover:scale-95 hover:bg-slate-100
                            `}
                        >
                            <div className="p-2">
                                <img
                                    src={data.img}
                                    alt={data.title}
                                    className="rounded-t-xl w-full h-52 lg:w-96 shadow-inner rounded-lg"
                                />
                            </div>
                            <div className="w-full xl:w-1/3 p-3 flex flex-col justify-between max-h-56 overflow-auto lg:h-auto">
                                <h1 className="text-left text-sm xl:text-lg text-slate-700 font-bold leading-normal min-w-fit">
                                    {data.title}
                                </h1>
                                <div className="flex flex-col">
                                    <h2 className="text-center text-xs mt-2 mb-2 text-blue-600 font-bold uppercase">
                                        {SiteName} Article
                                    </h2>
                                    <span className="self-center text-xs text-blue-700 -mt-2">
                                        {data.date}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))
                ) : (
                    <p>Loading bar</p>
                )}
                <div className="lg:px-4 w-full mt-2">
                    <div className="flex justify-center">
                        <div className="bg-white rounded-xl shadow-md flex w-full lg:w-1/2 p-2 justify-between h-12 lg:h-fit items-center">
                            <button
                                className="text-slate-500 border-slate-500 hover:text-blue-500 border hover:border-blue-500 w-6 h-6 rounded-xl duration-150 hover:scale-105 active:scale-95"
                                onClick={() => handleRotation(articlePage - 1)}
                            >
                                <Icon.LeftArrow />
                            </button>
                            {loaded &&
                                articles.map((data, index) => (
                                    <button
                                        onClick={() => handleRotation(index)}
                                        className={`transition-all w-3 self-center duration-150 hover:scale-150 active:scale-125 ease-in-out rounded-md xl:p-1 ${
                                            index === articlePage
                                                ? "bg-blue-500 h-3"
                                                : "bg-slate-300 h-2"
                                        } shadow`}
                                    />
                                ))}
                            <button
                                className="text-slate-500 border-slate-500 hover:text-blue-500 border hover:border-blue-500 w-6 h-6 rounded-xl duration-150 hover:scale-105 active:scale-95"
                                onClick={() => handleRotation(articlePage + 1)}
                            >
                                <Icon.RightArrow />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Component;
