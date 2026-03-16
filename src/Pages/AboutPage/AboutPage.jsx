import React, { useEffect, useState } from "react"

import SchoolDetails from "./Components/School-Details/SchoolDetails"
import Committee from "./Components/Committee/Committee"
import Gallery from "./Components/Gallery/Gallery"
import MemmorialPage from "./Components/MemmorialPage/MemmorialPage"
import Teachers from "./Components/Teachers/Teachers"

function AboutPage() {




  return (
    <div className="">
      {/* School Details Section */}
      <section className="school-details-section">
        <SchoolDetails  />
      </section>

     <section className="teachers-committee-section bg-black">
        <div className="">
          <div className="flex flex-col md:flex-row items-stretch">
            <div className="md:w-1/2 w-full">
              <Teachers  />
            </div>

            <div className="md:w-1/2 w-full">
             <Committee />
            </div>
          </div>
        </div>
      </section>

 
      
        <Gallery  />
   

      <section className="memorial-section">
        <MemmorialPage  />
      </section>
    </div>
  )
}

export default AboutPage