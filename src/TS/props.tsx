import { NasaArticle, NewsArticle, GamingNewsArticle } from "@lib/types";
import { useEffect, useState } from "react";
import { toast, ToastPosition } from "react-toastify";
import * as Icon from "./icons";
import { MOCK_NEWS_RESPONSE } from "src/TS/resource-data";

if (process.env.NODE_ENV === "development") console.log(process.env);
console.log(process.env.REACT_APP_HOST);

const NEWS_ENDPOINT = process.env.REACT_APP_NEWS_ENDPOINT || "";

function Functions() {
    /* News state and content */
    const [GamingArticles, setGamingArticles] = useState<GamingNewsArticle[]>(
        []
    );
    const [NewsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [NasaArticles, setNasaArticles] = useState<NasaArticle>();
    const [NewsLoaded, setNewsLoaded] = useState<boolean | string>(false);

    const props = {
        Icon,
        Notifications: {
            custom: (info: string, position: ToastPosition) => {
                toast.info(info, {
                    position: position,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
            error: (info: string, position: ToastPosition) => {
                toast.error(info, {
                    position: position,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
        },
        News: {
            GamingArticles,
            NewsArticles,
            NasaArticles,
            Loaded: NewsLoaded,
        },
    };

    // Used to reschedule fetch requests that failed
    const sleep = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        const get = async (URL: string) =>
            fetch(URL).then((data) => data.json());

        const getNews = async () => {
            if (process.env.NODE_ENV === "development") {
                setGamingArticles(MOCK_NEWS_RESPONSE.gaming);
                setNewsArticles(MOCK_NEWS_RESPONSE.news);
                setNasaArticles(MOCK_NEWS_RESPONSE.nasa);
                return;
            }

            get(NEWS_ENDPOINT)
                .then((data) => {
                    setGamingArticles(data.gaming);
                    setNewsArticles(data.news);
                    setNasaArticles(data.nasa);

                    setNewsLoaded(true);
                })
                .catch((e) => {
                    setNewsLoaded("Failed");
                    sleep(5000).then(getNews);
                });
        };

        getNews();

        setInterval(() => {
            getNews();
        }, 900000);
    }, []);

    return { props };
}

export default Functions;
