import React from 'react';
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';

const CatalogHelmet: React.FC = () => {
    const canonicalUrl = `${window.location.origin}${location.pathname}`;

    return (
        <HelmetProvider>
            <Helmet>
                <title>{'Каталог | Магазин женской одежды Queen'}</title>
                <meta
                    name="description"
                    content={
                        'Изучайте стильные новинки женской одежды в нашем каталоге! От классических базовых вещей до ярких трендов сезона – у нас вы найдете все для создания идеального образа. Погрузитесь в мир моды и выберите лучшее для себя!'
                    }
                />
                <meta
                    name="keywords"
                    content={
                        'женская одежда, магазин женской одежды, одежда, интернет магазин, магазин'
                    }
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content={'Каталог Queen'} />
                <meta
                    property="og:description"
                    content={'Большой выбор женской одежды в магазине Queen'}
                />
                <meta property="og:image" content={'/offerS1.webp'} />
                <meta property="og:url" content={'https://queen.com'} />
                <meta property="og:type" content="website" />
                <meta property="robots" content="index" />
                <meta property="robots" content="follow" />
            </Helmet>
        </HelmetProvider>
    );
};

export default CatalogHelmet;
