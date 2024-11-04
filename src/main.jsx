import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import HttpServicesPage from './pages/http_services/page.jsx';
import { Homepage } from './pages/homepage/page.jsx';
import { SubDomainsPage } from './pages/subdomains/page.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root><Outlet/></Root>,
    children: [
      {
        path: "",
        element: <Homepage/>
      },
      {
        path: "http_services",
        element: <HttpServicesPage/>
      },
      {
        path: "subdomains",
        element: <SubDomainsPage/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
