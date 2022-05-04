import React, {useState, useEffect} from 'react';
import { ModalsProvider } from "@mantine/modals";
import {NotificationsProvider} from "@mantine/notifications"
import Landing from "../components/Landing/Landing";
import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from "../utils/ProtectedRoute";
import Create from "../components/Create/Create";
import Home from "../components/Home/Home";
import Study from "../components/Study/StudyWrapper";
import HistoryRouter from './HistoryRouter'
import RouterHistory from './RouterHistory'
import EditWrapper from "../components/Edit/EditWrapper";
import useSocket from "../hooks/useSocket";
function MainRouter() {
  useSocket()
  return (
    <NotificationsProvider>
      <ModalsProvider>
          <HistoryRouter history={RouterHistory}>
              <Routes>
                  <Route path="/u/edit/:id" element={<ProtectedRoute children={<EditWrapper/>}/>}/>
                  <Route path="/test" element={<Create/>}/>
                  <Route path="/" element={<Landing/>}/>
                  <Route path="/u/home" element={<ProtectedRoute children={<Home/>}/>}/>
                  <Route path="/u/create" element={<ProtectedRoute children={<Create/>}/>}/>
                  <Route path="/u/test" element={<div><Home/></div>}/>
                  <Route path="u/study/:id" element={<ProtectedRoute children={<Study/>}/>}/>
              </Routes>
              </HistoryRouter>
      </ModalsProvider>
    </NotificationsProvider>
        
  )
}

export default MainRouter