import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fleur+De+Leah&family=Hina+Mincho&family=Inter:wght@300;400;500;600;700&family=Noto+Serif&family=Peddana&family=Uchen&display=swap" rel="stylesheet" type='text/css' />
                </Head>
                
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
