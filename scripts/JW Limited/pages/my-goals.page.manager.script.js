function renderGoals(content) {
  const goals = [
    {
      id: 1,
      title: "Learn a new programming language",
      description: "Expand my skill set by learning a new programming language like Python or Rust.",
      dueDate: "2024-06-30",
      progress: 30,
      steps: [
        { task: "Research and choose a programming language.", done: false },
        { task: "Find and enroll in a course.", done: false },
        { task: "Complete exercises and projects.", done: false },
        { task: "Build a small project to solidify knowledge.", done: false }
      ]
    },
    {
      id: 2,
      title: "Complete a personal project",
      description: "Develop a personal project to showcase my skills and add to my portfolio.",
      dueDate: "2024-08-15",
      progress: 60,
      steps: [
        { task: "Define the project scope and objectives.", done: false },
        { task: "Create a project plan and timeline.", done: false },
        { task: "Develop the project in stages.", done: false },
        { task: "Test and refine the project.", done: false },
        { task: "Prepare a portfolio presentation.", done: false }
      ]
    },
    {
      id: 3,
      title: "Attend a tech conference",
      description: "Attend a tech conference to network and learn about the latest trends in the industry.",
      dueDate: "2024-10-01",
      progress: 20,
      steps: [
        { task: "Research upcoming tech conferences.", done: false },
        { task: "Register for the selected conference.", done: false },
        { task: "Prepare a list of sessions and workshops to attend.", done: false },
        { task: "Network with industry professionals.", done: false },
        { task: "Summarize key takeaways and apply learnings.", done: false }
      ]
    },
  ];

  const goalsContainer = createGoalsContainer();
  const goalsList = createGoalsList(goals);
  goalsContainer.appendChild(goalsList);
  content.appendChild(goalsContainer);
}

function createGoalsContainer() {
  const goalsContainer = document.createElement("div");
  goalsContainer.classList.add("account-goals-container");

  const header = document.createElement("h2");
  header.textContent = "My Goals";
  goalsContainer.appendChild(header);

  return goalsContainer;
}

function createGoalsList(goals) {
  const goalsList = document.createElement("ul");
  goalsList.classList.add("goals-list");

  goals.forEach((goal) => {
    const goalItem = createGoalItem(goal);
    goalsList.appendChild(goalItem);
  });

  return goalsList;
}

function createGoalItem(goal) {
  const goalItem = document.createElement("li");
  goalItem.classList.add("goal-item");

  const goalTitle = createGoalTitle(goal.title);
  goalItem.appendChild(goalTitle);

  const goalDescription = createGoalDescription(goal.description);
  goalItem.appendChild(goalDescription);

  const goalProgress = createGoalProgress(goal.progress);
  goalItem.appendChild(goalProgress);

  const dueDate = createDueDate(goal.dueDate);
  goalItem.appendChild(dueDate);

  const stepPlan = createStepPlan(goal.steps);
  goalItem.appendChild(stepPlan);

  return goalItem;
}

function createGoalTitle(title) {
  const goalTitle = document.createElement("h3");
  goalTitle.classList.add("goal-title");
  goalTitle.textContent = title;

  return goalTitle;
}

function createGoalDescription(description) {
  const goalDescription = document.createElement("p");
  goalDescription.classList.add("goal-description");
  goalDescription.textContent = description;

  return goalDescription;
}

function createGoalProgress(progress) {
  const goalProgress = document.createElement("div");
  goalProgress.classList.add("goal-progress");

  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");
  progressBar.style.width = `${progress}%`;
  goalProgress.appendChild(progressBar);

  const progressLabel = document.createElement("span");
  progressLabel.classList.add("progress-label");
  progressLabel.textContent = `${progress}% Complete`;
  goalProgress.appendChild(progressLabel);

  return goalProgress;
}

function createDueDate(dueDate) {
  const dueDateElement = document.createElement("p");
  dueDateElement.classList.add("due-date");
  dueDateElement.textContent = `Due: ${dueDate}`;

  return dueDateElement;
}

function createStepPlan(steps) {
  const stepPlanContainer = document.createElement("div");
  stepPlanContainer.classList.add("step-plan-container");

  const stepList = document.createElement("ul");
  stepList.classList.add("step-list");

  steps.forEach((step, index) => {
    const stepItem = document.createElement("li");
    stepItem.classList.add("step-item");

    const stepCheckbox = document.createElement("input");
    stepCheckbox.type = "checkbox";
    stepCheckbox.checked = step.done;
    stepCheckbox.addEventListener("change", () => {
      step.done = stepCheckbox.checked;
      updateProgress();
    });
    stepItem.appendChild(stepCheckbox);

    const stepLabel = document.createElement("label");
    stepLabel.textContent = step.task;
    stepItem.appendChild(stepLabel);

    stepList.appendChild(stepItem);
  });

  stepPlanContainer.appendChild(stepList);

  function updateProgress() {
    const totalSteps = steps.length;
    const completedSteps = steps.filter(step => step.done).length;
    const progress = Math.round((completedSteps / totalSteps) * 100);
    progressBar.style.width = `${progress}%`;
    progressLabel.textContent = `${progress}% Complete`;
  }

  return stepPlanContainer;
}
