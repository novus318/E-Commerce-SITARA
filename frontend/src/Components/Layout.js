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
    description:'Discover the world of elegance and style with Sitara, a premier womens clothing e-commerce application. We take immense pride in curating the finest collection of trendy and fashionable attire for the modern woman. Whether you are searching for a chic outfit for a special occasion or versatile everyday wear, we have got you covered',
    keywords:'sitara,Sitara,Muhammed Nizamudheen M,muhammed nizamudheen m,nizamudheen m,nizamudheen,women clothing,clothing,plazo,plazzo,kurti,kurthas,kurtha,sithara,Sitara,e-commerce',
    author:'Muhammed Nizamudheen M'
}

export default Layout
