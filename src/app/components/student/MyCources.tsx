import React from 'react'
import { useUser } from '../../context/StudentContext'
function MyCources() {
    const {userData,courseFullData,selectedCourse, setSelectedCourse,selectedSession, setSelectedSession} = useUser();
  return (
    <div className='w-full min-h-screen p-4 bg-[#f6f6f6]'>
        

        {/* course card -------------------------- */}
      {courseFullData && (
  <div 
    onClick={() => setSelectedCourse(courseFullData)}
    className="border p-4 rounded cursor-pointer w-70 bg-[#a1aede]"
  >
    <img
      src={courseFullData.thumbnail}
      alt={courseFullData.title}
      className="w-full h-40 object-cover"
    />

    <h2>{courseFullData.title}</h2>
    <p>{courseFullData.description}</p>
  </div>
)}

{/* sessions--------------------- */}
{selectedCourse && (
  <div className="mt-5">
    <h2>Sessions</h2>

    {selectedCourse.sessions.map((session : any) => (
      <div
        key={session._id}
        onClick={() => setSelectedSession(session)}
        className="border p-3 rounded mb-2 cursor-pointer bg-[#a1aede]"
      >
        <h3>{session.title}</h3>
      </div>
    ))}
  </div>
)}


{/* lessons ----------------------------- */}
{selectedSession && (
  <div className="mt-5">
    <h2>{selectedSession.title}</h2>

    {selectedSession.lessons.map((lesson : any) => (
      <div
        key={lesson._id}
        className="border p-3 rounded mb-2 bg-[#a1aede]"
      >
        <h4>{lesson.title}</h4>
        <p>{lesson.content}</p>

        <a
          href={lesson.videoUrl}
          target="_blank"
        >
          Watch Video
        </a>
      </div>
    ))}
  </div>
)}
       
        
    </div>
  )
}

export default MyCources