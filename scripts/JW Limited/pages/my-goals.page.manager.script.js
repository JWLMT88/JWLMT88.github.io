function renderGoals(content) 
    {
    
          var goals = [
            {
              id: 1,
              title: "Learn a new programming language",
              description: "Expand my skill set by learning a new programming language like Python or Rust.",
              dueDate: "2024-06-30",
              progress: 30,
            },
            {
              id: 2,
              title: "Complete a personal project",
              description: "Develop a personal project to showcase my skills and add to my portfolio.",
              dueDate: "2024-08-15",
              progress: 60,
            },
            {
              id: 3,
              title: "Attend a tech conference",
              description: "Attend a tech conference to network and learn about the latest trends in the industry.",
              dueDate: "2024-10-01",
              progress: 20,
            },
          ];

      const goalsContainer = document.createElement("div");
      goalsContainer.classList.add("account-goals-container");
  
      const header = document.createElement("h2");
      header.textContent = "My Goals";
      goalsContainer.appendChild(header);
  
      const userInfo = document.createElement("div");
      userInfo.classList.add("user-info");
  
      const profilePic = document.createElement("div");
      profilePic.classList.add("profile-pic");
      profilePic.style.backgroundImage = `url(/media/icons/logo.png)`;
      userInfo.appendChild(profilePic);
  
      const username = document.createElement("span");
      username.classList.add("username");
      username.textContent = "username";
      userInfo.appendChild(username);
  
      goalsContainer.appendChild(userInfo);
  
      const goalsList = document.createElement("ul");
      goalsList.classList.add("goals-list");
  
      goals.forEach((goal) => {
        const goalItem = document.createElement("li");
        goalItem.classList.add("goal-item");
  
        const goalTitle = document.createElement("h3");
        goalTitle.classList.add("goal-title");
        goalTitle.textContent = goal.title;
        goalItem.appendChild(goalTitle);
  
        const goalDescription = document.createElement("p");
        goalDescription.classList.add("goal-description");
        goalDescription.textContent = goal.description;
        goalItem.appendChild(goalDescription);
  
        const goalProgress = document.createElement("div");
        goalProgress.classList.add("goal-progress");
  
        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        progressBar.style.width = `${goal.progress}%`;
        goalProgress.appendChild(progressBar);
  
        const progressLabel = document.createElement("span");
        progressLabel.classList.add("progress-label");
        progressLabel.textContent = `${goal.progress}% Complete`;
        goalProgress.appendChild(progressLabel);
  
        goalItem.appendChild(goalProgress);
  
        const dueDate = document.createElement("p");
        dueDate.classList.add("due-date");
        dueDate.textContent = `Due: ${goal.dueDate}`;
        goalItem.appendChild(dueDate);
  
        goalsList.appendChild(goalItem);
      });
  
      goalsContainer.appendChild(goalsList);
  
      content.appendChild(goalsContainer);
    }