import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  {path:"productdetils/:id" ,  renderMode: RenderMode.Server},
  {path:"checkOut/:cartID" ,  renderMode: RenderMode.Server},
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
