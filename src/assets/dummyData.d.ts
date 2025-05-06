export declare const dummy: ({
    _id: {
        $oid: string;
    };
    group_id: string;
    representative_title: string;
    articles: {
        id: string;
        title: string;
        url: string;
        cover_image: string;
        date_published: string;
        content: string;
        source: string;
        category: string;
    }[];
    id: string;
    category: string;
    date_published: {
        $date: string;
    };
    short_summary: string;
    long_summary: string;
    title?: undefined;
    url?: undefined;
    cover_image?: undefined;
    content?: undefined;
    source?: undefined;
} | {
    _id: {
        $oid: string;
    };
    id: string;
    title: string;
    url: string;
    cover_image: string;
    date_published: {
        $date: string;
    };
    content: string;
    source: string;
    category: string;
    short_summary: string;
    long_summary: string;
    group_id?: undefined;
    representative_title?: undefined;
    articles?: undefined;
})[];
