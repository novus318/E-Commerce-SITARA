import React from 'react'
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';
import { Scrollbars } from 'react-custom-scrollbars'

function Layout({children,title,description,keywords,author}) {
  return (
    <div>
        <Helmet>
                <meta charSet="utf-8" />
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Toaster />
            <Scrollbars>
      {children}
      </Scrollbars>
    </div>
  )
}
Layout.defaultProps ={
    title: 'Sitara',
    description:'',
    keywords:'',
    author:'Muhammed Nizamudheen M'
}

export default Layout
