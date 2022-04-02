import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

// Document 컴포넌트는 서버 단에서 한번만 실행된다.
class MyDocument extends Document {

  static async getInitialProps(ctx: DocumentContext) {

    const originalRenderPage = ctx.renderPage

    // React 렌더링 로직을 동기적으로 실행
    ctx.renderPage = () =>
      originalRenderPage({
        // 전체 react tree 를 wrapping 하는 데 유용합니다.
        enhanceApp: (App) => App,
        // per-page basis 를 wrapping 하는 데 유용합니다.
        enhanceComponent: (Component) => Component,
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang='ko'>
        <Head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />  {/* // APP 컴포넌트 */}
          <NextScript />
        </body>
      </Html>
    )
  }

}

export default MyDocument