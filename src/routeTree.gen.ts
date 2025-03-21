/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as IndexImport } from './routes/index'
import { Route as PdfIndexImport } from './routes/pdf/index'
import { Route as PdfUploadImport } from './routes/pdf/upload'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PdfIndexRoute = PdfIndexImport.update({
  id: '/pdf/',
  path: '/pdf/',
  getParentRoute: () => rootRoute,
} as any)

const PdfUploadRoute = PdfUploadImport.update({
  id: '/pdf/upload',
  path: '/pdf/upload',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/pdf/upload': {
      id: '/pdf/upload'
      path: '/pdf/upload'
      fullPath: '/pdf/upload'
      preLoaderRoute: typeof PdfUploadImport
      parentRoute: typeof rootRoute
    }
    '/pdf/': {
      id: '/pdf/'
      path: '/pdf'
      fullPath: '/pdf'
      preLoaderRoute: typeof PdfIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/pdf/upload': typeof PdfUploadRoute
  '/pdf': typeof PdfIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/pdf/upload': typeof PdfUploadRoute
  '/pdf': typeof PdfIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/pdf/upload': typeof PdfUploadRoute
  '/pdf/': typeof PdfIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/dashboard'
    | '/login'
    | '/register'
    | '/pdf/upload'
    | '/pdf'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/dashboard' | '/login' | '/register' | '/pdf/upload' | '/pdf'
  id:
    | '__root__'
    | '/'
    | '/dashboard'
    | '/login'
    | '/register'
    | '/pdf/upload'
    | '/pdf/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DashboardRoute: typeof DashboardRoute
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
  PdfUploadRoute: typeof PdfUploadRoute
  PdfIndexRoute: typeof PdfIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DashboardRoute: DashboardRoute,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
  PdfUploadRoute: PdfUploadRoute,
  PdfIndexRoute: PdfIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard",
        "/login",
        "/register",
        "/pdf/upload",
        "/pdf/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/pdf/upload": {
      "filePath": "pdf/upload.tsx"
    },
    "/pdf/": {
      "filePath": "pdf/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
