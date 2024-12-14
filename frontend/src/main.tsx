// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Home from './pages/Home.tsx'
import Landing from './pages/Landing.tsx'
import Post from './pages/Post.tsx'
import CreatePost from './pages/CreatePost.tsx'
import { Toaster } from './components/ui/toaster.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
<>

    <Toaster/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/' element={<ProtectedRoute/>} >
          <Route path='home' element={<Home />} />
          <Route path='post/:id' element={<Post />} />
          <Route path='create' element={<CreatePost />} />

        </Route>
      </Routes>
    </BrowserRouter>
  {/* </StrictMode>, */}
</>
)
