import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Landing from "../components/Landing/Landing";
import Landing from '../pages/Landing/Landing'
import Create from '../pages/Create/Create';
import EditWrapper from "../pages/Edit/Edit";
import Home from '../pages/Home/Home';
import Study from "../pages/Study/StudyWrapper";
import useSocket from "../shared/hooks/useSocket";
import ProtectedRoute from "./ProtectedRoute";
import HistoryRouter from './HistoryRouter';
import RouterHistory from './RouterHistory';
function MainRouter() {
  useSocket()
  return (
    <NotificationsProvider>
      <ModalsProvider>
          <HistoryRouter history={RouterHistory}>
              <Routes>
                  <Route path="/u/edit/:id" element={<ProtectedRoute children={<EditWrapper/>}/>}/>
                  <Route path="/" element={<Landing/>}/>
                  <Route path="/u/home" element={<ProtectedRoute children={<Home/>}/>}/>
                  <Route path="/u/create" element={<ProtectedRoute children={<Create/>}/>}/>
                  <Route path="u/study/:id" element={<ProtectedRoute children={<Study/>}/>}/>
                  <Route path="*" element={<Landing/>}/>
              </Routes>
              </HistoryRouter>
      </ModalsProvider>
    </NotificationsProvider>
        
  )
}

export default MainRouter