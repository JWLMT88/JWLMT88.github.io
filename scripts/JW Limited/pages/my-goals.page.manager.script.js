async function renderGoals(content) {
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

  content.innerHTML = '';
  const goalsContainer = createGoalsContainer();
  const greeting = await createGreeting();
  const mantras = createMantras();
  const goalsList = createGoalsList(goals);
  
  goalsContainer.appendChild(greeting);
  goalsContainer.appendChild(mantras);
  goalsContainer.appendChild(goalsList);
  content.appendChild(goalsContainer);
}

function createGoalsContainer() {
  const goalsContainer = document.createElement("div");
  goalsContainer.classList.add(  "bg-white", "p-8", "rounded-lg",  "border", "border-gray-200", "content-container-margin");
  return goalsContainer;
}

function createActionButtons(goalId) {
  const actionButtonsContainer = document.createElement("div");
  actionButtonsContainer.classList.add("absolute", "top-2", "right-2", "flex", "space-x-2");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("bg-gray-200", "text-white", "px-8", "py-2", "rounded-lg","border","border-gray-200","mt-3","mb-3", "goal-actBnt",   "hover:bg-red-700", "focus:outline-none", "focus:ring-2", "focus:ring-red-500", "text-sm");
  deleteButton.textContent = "Delete";
  deleteButton.style.marginRight = "-2px"
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevents triggering the click event on the goal item
    alert(`Deleting goal with ID: ${goalId}`);
  });

  const shareButton = document.createElement("button");
  shareButton.classList.add("bg-gray-200", "text-white", "px-8", "py-2", "rounded-lg","border","border-gray-200","m-3", "hover:bg-blue-700", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "text-sm");
  shareButton.textContent = "Share";
  shareButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevents triggering the click event on the goal item
    alert(`Sharing goal with ID: ${goalId}`);
  });

  actionButtonsContainer.appendChild(deleteButton);
  actionButtonsContainer.appendChild(shareButton);

  return actionButtonsContainer;
}

async function createGreeting() {
  const heroSection = document.createElement("div");
  heroSection.classList.add("bg-white", "text", "p-6", "rounded-lg", "mb-8", "grid", "grid-cols-1", "md:grid-cols-2", "gap-4");

  // Left side - Big Text
  const leftSide = document.createElement("div");
  const bigText = document.createElement("div");
  bigText.classList.add( "font-bold", "mb-4");

  const textPart1 = document.createElement("div");
  textPart1.classList.add("text-4xl","font-serif");
  textPart1.textContent = "Your";

  const textPart2 = document.createElement("div");
  textPart2.classList.add("text-6xl","font-sans");
  textPart2.textContent = "Goals";

  bigText.appendChild(textPart1);
  bigText.appendChild(textPart2);
  leftSide.appendChild(bigText);

  // Right side - Quote
  const rightSide = document.createElement("div");
  rightSide.classList.add("text-right");

  const quoteData = await fetchQuote();
  const quoteText = document.createElement("p");
  quoteText.classList.add("text-lg", "font-light");
  quoteText.textContent = `"${quoteData.quote}"`;

  const quoteAuthor = document.createElement("p");
  quoteAuthor.classList.add("mt-2", "text-sm", "font-semibold");
  quoteAuthor.textContent = `- ${quoteData.author}`;

  const authorImage = document.createElement("img");
  authorImage.src = quoteData.image;
  authorImage.alt = quoteData.author;
  authorImage.classList.add("w-16", "h-16", "rounded-full", "mt-4", "mx-auto", "border-2", "border-white", "shadow-md");

  rightSide.appendChild(quoteText);
  rightSide.appendChild(quoteAuthor);
  rightSide.appendChild(authorImage);

  heroSection.appendChild(leftSide);
  heroSection.appendChild(rightSide);

  return heroSection;
}

async function fetchQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random?tags=success');
    const data = await response.json();
    const authorImage = await fetchAuthorImage(data.author);
    return { quote: data.content, author: data.author, image: authorImage };
  } catch (error) {
    console.error('Error fetching quote:', error);
    return { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", image: "https://via.placeholder.com/64" };
  }
}

async function fetchAuthorImage(author) {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=person&client_id=YOUR_UNSPLASH_ACCESS_KEY`);
    const data = await response.json();
    return data.urls.thumb;
  } catch (error) {
    console.error('Error fetching author image:', error);
    return "https://via.placeholder.com/64";
  }
}


function createMantras() {
  const mantrasContainer = document.createElement("div");
  mantrasContainer.classList.add("grid", "grid-cols-1", "md:grid-cols-3", "gap-4", "mb-8");

  const mantras = [
    "Stay Focused and Never Give Up",
    "Embrace Challenges and Learn",
    "Progress, Not Perfection"
  ];

  mantras.forEach(text => {
    const mantraBox = document.createElement("div");
    mantraBox.classList.add("bg-gradient-to-r", "from-blue-500", "to-blue-300", "text-white", "p-4", "rounded-lg", "text-center", "font-semibold", "border", "border-gray-200");
    mantraBox.textContent = text;
    mantrasContainer.appendChild(mantraBox);
  });

  return mantrasContainer;
}

function createGoalsList(goals) {
  const goalsList = document.createElement("ul");
  goalsList.classList.add("space-y-6");

  goals.forEach((goal) => {
    const goalItem = createGoalItem(goal);
    goalsList.appendChild(goalItem);
  });

  return goalsList;
}

function createGoalItem(goal) {
  const goalItem = document.createElement("li");
  goalItem.classList.add("p-6", "bg-gray-100", "rounded-lg", "border", "relative", "border-gray-200", "cursor-pointer");

  const actionButtons = createActionButtons(goal.id);
  goalItem.appendChild(actionButtons);

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
  goalTitle.classList.add("text-xl", "font-semibold", "mb-2");
  goalTitle.textContent = title;

  return goalTitle;
}

function createGoalDescription(description) {
  const goalDescription = document.createElement("p");
  goalDescription.classList.add("text-gray-700", "mb-4");
  goalDescription.textContent = description;

  return goalDescription;
}

function createGoalProgress(progress) {
  const goalProgress = document.createElement("div");
  goalProgress.classList.add("mb-4");

  const progressBarContainer = document.createElement("div");
  progressBarContainer.classList.add("w-full", "bg-gray-300", "rounded-full", "h-4", "overflow-hidden");

  const progressBar = document.createElement("div");
  progressBar.classList.add("bg-blue-500", "h-full", "transition-width", "duration-500");
  progressBar.style.width = `${progress}%`;

  progressBarContainer.appendChild(progressBar);
  goalProgress.appendChild(progressBarContainer);

  const progressLabel = document.createElement("span");
  progressLabel.classList.add("text-sm", "text-gray-600");
  progressLabel.textContent = `${progress}% Complete`;
  goalProgress.appendChild(progressLabel);

  return goalProgress;
}

function createDueDate(dueDate) {
  const dueDateElement = document.createElement("p");
  dueDateElement.classList.add("text-gray-500", "text-sm", "mb-4");
  dueDateElement.textContent = `Due: ${dueDate}`;

  return dueDateElement;
}

function createStepPlan(steps) {
  const stepPlanContainer = document.createElement("div");
  stepPlanContainer.classList.add("mb-4");

  const stepList = document.createElement("ul");
  stepList.classList.add("space-y-2");

  steps.forEach((step) => {
    const stepItem = document.createElement("li");
    stepItem.classList.add("flex", "items-center");

    const stepCheckbox = document.createElement("input");
    stepCheckbox.type = "checkbox";
    stepCheckbox.classList.add("form-checkbox", "h-5", "w-5", "text-blue-500", "transition", "duration-150", "ease-in-out");
    stepCheckbox.checked = step.done;
    stepCheckbox.addEventListener("change", () => {
      step.done = stepCheckbox.checked;
      updateProgress();
    });
    stepItem.appendChild(stepCheckbox);

    const stepLabel = document.createElement("label");
    stepLabel.classList.add("ml-2", "text-gray-700");
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
