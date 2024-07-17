document.addEventListener("DOMContentLoaded", () => {
  const resumeForm = document.getElementById("Resume-Data");
  const resumeList = document.getElementById("resumeList");

  resumeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phoneNo = document.getElementById('phone').value;
      const address = document.getElementById("address").value;
      const gender = document.getElementById("gender").value;
      const dob = document.getElementById("dob").value;
      const skills = document.getElementById("skills").value;
      const education = document.getElementById("education").value;
      const experience = document.getElementById("experience").value;
      const company = document.getElementById("company").value;

      const resume = {
          name,
          email,
          phoneNo,
          address,
          gender,
          dob,
          skills,
          education,
          experience,
          company,
      };

      const editIndex = parseInt(resumeForm.dataset.editIndex);
      if (editIndex >= 0) {
          // Editing an existing resume
          const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
          resumes[editIndex] = resume;
          localStorage.setItem("resumes", JSON.stringify(resumes));
          resumeForm.dataset.editIndex = -1; // Reset the edit index
      } else {
          // Creating a new resume
          saveResume(resume);
      }

      resumeForm.reset();
      renderResumeList();
  });

    //for saving and pushing in array
    function saveResume(resume) {
      let resumes = JSON.parse(localStorage.getItem("resumes")) || [];
      const editIndex = parseInt(resumeForm.dataset.editIndex);
      if (editIndex >= 0) {
          // If editIndex is valid, update the existing resume
          resumes[editIndex] = resume;
      } else {
          // Otherwise, add a new resume to the list
          resumes.push(resume);
      }
      localStorage.setItem("resumes", JSON.stringify(resumes));
  }

    function renderResumeList() {
        resumeList.innerHTML = "";

        const resumes = JSON.parse(localStorage.getItem("resumes")) || [];

        for (let i = 0; i < resumes.length; i++) {
            const resume = resumes[i];
            const listItem = document.createElement("li");
            listItem.innerHTML = `
            <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Gender</th>
                    <th>DateOfBirth</th>
                    <th>Skills</th>
                    <th>Education</th>
                    <th>Experiance</th>
                    <th>Pre Company</th>
                </tr>
            </thead>
            <tbody id="data-table-body">
                  <tr>
                     <td>${resume.name}</td>
                     <td>${resume.email}</td>
                     <td>${resume.phoneNo}</td>
                     <td>${resume.address}</td>
                     <td>${resume.gender}</td>
                     <td>${resume.dob}</td>
                     <td>${resume.skills}</td>
                     <td>${resume.education}</td>
                     <td>${resume.experience}</td>
                     <td>${resume.company}</td>
                  </tr>
            </tbody>
        </table>
            <div class="tableButtons">
                <button class="view" data-index="${i}">View</button>
                <button class="delete" data-index="${i}">Delete</button>
                <button class="edit" data-index="${i}">Edit</button>
            </div>
            `;

            resumeList.appendChild(listItem);
        }
    }

    resumeList.addEventListener("click", (e) => {
        if (e.target.classList.contains("view")) {
            const index = e.target.getAttribute("data-index");
            viewResume(index);
        } else if (e.target.classList.contains("delete")) {
            const index = e.target.getAttribute("data-index");
            console.log(index);
            deleteResume(index);
        }
        else if (e.target.classList.contains("edit")) {
            const index = e.target.getAttribute("data-index");
            const selectedResume = JSON.parse(localStorage.getItem("resumes"))[index];

            // Populate the form fields with the selected resume's data
            document.getElementById("name").value = selectedResume.name;
            document.getElementById("email").value = selectedResume.email;
            document.getElementById("phone").value = selectedResume.phoneNo;
            document.getElementById("address").value = selectedResume.address;
            document.getElementById("gender").value = selectedResume.gender;
            document.getElementById("dob").value = selectedResume.dob;
            document.getElementById("skills").value = selectedResume.skills;
            document.getElementById("education").value = selectedResume.education;
            document.getElementById("experience").value = selectedResume.experience;
            document.getElementById("company").value = selectedResume.company;

            // Populate the radio button for experience
            const experienceRadios = document.querySelectorAll('input[name="experience"]');
            for (const radio of experienceRadios) {
                if (radio.value === selectedResume.experience) {
                    radio.checked = true;
                    break; // Once found, exit the loop
                }
            }

            document.getElementById("gender").value = selectedResume.gender;
            document.getElementById("project").value = selectedResume.project;
            document.getElementById("dob").value = selectedResume.dob;

            // Store the index of the resume being edited for later use
            resumeForm.dataset.editIndex = index;
        }

    });

    function viewResume(index) {
        const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
        const selectedResume = resumes[index];
        if (selectedResume) {

            const resumeData = JSON.stringify(selectedResume);

            console.log(resumeData);
            window.location.href = `resume.html?resumeData=${resumeData}`;
        } else {
            console.error("Selected resume not found.");
        }
    }
    function deleteResume(index) {
        const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
        resumes.splice(index, 1);
        localStorage.setItem("resumes", JSON.stringify(resumes));
        renderResumeList();
    }
    renderResumeList();
});


//resume.html
const urlParams = new URLSearchParams(window.location.search);
const resumeData = urlParams.get("resumeData");

if (resumeData) {

    const resume = JSON.parse(resumeData);
    console.log(resume);
    const resumeDetails = document.getElementById("resumeDetails");
    resumeDetails.innerHTML = `<div class="container">
    <div class="header">
      <div class="full-name">
        <span class="first-name">${resume.name}</span> 
      </div>
      <div class="contact-info">
        <span class="email">Email: </span>
        <span class="email-val">${resume.email}</span>
        <span class="separator"></span>
        <span class="phone">Phone:</span>
        <span class="phone-val">${resume.phoneNo}</span>
      </div>
      
      <div class="about">
        <span class="position">Skills</span>
        <span class="desc">${resume.skills}</span>
      </div>
    </div>
     <div class="details">
      <div class="section">
        <div class="section__title">Experience</div>
        <div class="section__list">
          <div class="section__list-item">
            <div class="left">
              <div class="name">${resume.experience}</div>
              </div>

    
         <div class="section__list-item">
            <div class="left">
              <div class="name">Address</div>
              <div class="addr">${resume.address}</div>
            </div>
        </div>
  
        </div>
      </div>
      <div class="section">
        <div class="section__title">Education</div>
        <div class="section__list">
          <div class="section__list-item">
            <div class="left">
              <div class="name">${resume.education}</div>
            </div>
          </div>

        </div>
        
    </div>
       <div class="section">
        <div class="section__title">Persnal</div> 
         <div class="section__list">
           <div class="section__list-item">
             <div class="name">Date Of Birth</div>
             <div class="text">${resume.dob}</div>
           </div>
           
           <div class="section__list-item">
                      <div class="name">Gender</div>
             <div class="text">${resume.gender}</div>
           </div>
         </div>
      </div>
      
            

       <div class="section">
       <div class="section__title">Prevois Company</div>
         <div class="section__list">
           <div class="section__list-item">${resume.company}</div>
         </div>
       </div>
       </div>
    </div>
  </div>

    `;

} else {
    console.error("Resume data not found in query parameter.");
}