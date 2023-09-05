import '#assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  App,
  ProtectedRoute,
  RouterProvider,
  SidebarWrapper,
  StoreProvider,
  Toast,
} from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { store } from '#libs/packages/store/store.js';
import { Auth } from '#pages/auth/auth.js';
import { Chats } from '#pages/chat/chat.js';
import { Meditation } from '#pages/meditation/meditation.js';
import { Root } from '#pages/root/root.js';
import { Survey } from '#pages/surveys/survey.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <StoreProvider store={store.instance}>
      <RouterProvider
        routes={[
          {
            path: AppRoute.ROOT,
            element: <App />,
            children: [
              {
                path: AppRoute.ROOT,
                element: (
                  <ProtectedRoute>
                    <SidebarWrapper>
                      <Root />
                    </SidebarWrapper>
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.MEDITATION,
                element: (
                  <ProtectedRoute>
                    <SidebarWrapper>
                      <Meditation />
                    </SidebarWrapper>
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.SIGN_IN,
                element: <Auth />,
              },
              {
                path: AppRoute.SIGN_UP,
                element: <Auth />,
              },
              {
                path: AppRoute.SIGN_UP_SURVEY,
                element: (
                  <ProtectedRoute>
                    <Survey />
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.CHATS,
                element: (
                  <ProtectedRoute>
                    <SidebarWrapper>
                      <Chats />
                    </SidebarWrapper>
                  </ProtectedRoute>
                ),
              },
            ],
          },
        ]}
      />
      <Toast />
    </StoreProvider>
  </StrictMode>,
);
