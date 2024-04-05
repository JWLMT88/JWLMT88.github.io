var GoalManager = (function() {
    var instance;

    function GoalManager() 
    {
        var goals = [];

        function generateUniqueId() {
            return Math.floor(Math.random() * 100000); 
        }

        function createGoalCode(goal) 
        {
            const goalTemplate = `
            <div class="goal" id="goalID-${goal.id}">
                <div class="goal-content">
                    <div class="goal-title">${goal.title}</div>
                    <div class="goal-description">${goal.description}</div>
                </div>
                <div class="goal-actions">
                    <button class="delete-goal-btn"><span class="material-icons">delete</span></button>
                </div>
            </div>`;
            return goalTemplate;
        }
        function updateGoals() 
        {
            $('.goals-container').empty();
            $('.goals-container').append(``);
            $('.goals-container').append(`
            <div class="goal-header">
                <div class="goal-label">Goals</div>
                <button class="navigate-to-goals-btn-top">
                    <span class="material-icons">arrow_forward</span>
                </button>
            </div>
            `);
            goals.forEach(function(goal, index) {
                var goalItem = createGoalCode(goal);
                $('.goals-container').append(goalItem);
            });
            $('.delete-goal-btn').click(function() {
                var id = $(this).closest('.goal').attr('id').split('-')[1];
                removeGoal(id);
            });
            $('.navigate-to-goals-btn, .navigate-to-goals-btn-top').click(function() {
                // Redirect to goals page
                window.location.href = '/account/goals';
            });
        }

        this.addGoal = function(title, description) 
        {
            var goal = 
            {
                title: title,
                description: description,
                id: generateUniqueId()
            };
            goals.push(goal);
            updateGoals();
        };

        function removeGoal(id) 
        {
            var index = goals.findIndex(function(goal) 
            {
                return goal.id === id;
            });
            if (index !== -1) 
            {
                goals.splice(index, 1);
                updateGoals();
            }
        }
        this.init = function()
        {
            $('.goals-container').empty();
            $('.goals-container').append(``);
            $('.goals-container').append(`
            <div class="goal-header">
                <div class="goal-label">Goals</div>
                <button class="navigate-to-goals-btn-top">
                    <span class="material-icons">arrow_forward</span>
                </button>
            </div>
            `);
            $('.navigate-to-goals-btn, .navigate-to-goals-btn-top').click(function() 
            {
                window.location.href = '/account/goals';
            });
        }
    }
    return {
        
        getInstance: function() 
        {

            if (!instance) 
            {
                instance = new GoalManager();
            }

            return instance;
        }
    };
})();


