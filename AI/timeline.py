from flask import Flask, Blueprint, jsonify, request
from experta import *
import json
from datetime import datetime, timedelta

expert_systems_bp = Blueprint('expert_systems', __name__, url_prefix='/expert-systems')

# Task class definition
class Task:
    def __init__(self, name, duration, dependencies=[]):
        self.name = name
        self.duration = duration
        self.dependencies = dependencies
        self.early_start = 0
        self.early_finish = 0
        self.late_start = 0
        self.late_finish = 0
        self.slack = 0

# Task definitions for different project types
event_tasks = [
    Task("Venue Booking", 7),
    Task("Marketing", 14, ["Venue Booking"]),
    Task("Logistics Planning", 10, ["Venue Booking"]),
    Task("Catering Arrangements", 5, ["Venue Booking"]),
    Task("Setup and Decoration", 7, ["Marketing", "Logistics Planning", "Catering Arrangements"]),
    Task("Event", 1, ["Setup and Decoration"]),
    Task("Event Cleanup", 3, ["Event"])
]

app_dev_tasks = [
    Task("Requirement Gathering", 10),
    Task("Design", 15, ["Requirement Gathering"]),
    Task("Development", 30, ["Design"]),
    Task("Testing", 15, ["Development"]),
    Task("Deployment", 5, ["Testing"]),
    Task("Maintenance", 10, ["Deployment"])
]

@expert_systems_bp.route('/generate-timeline', methods=['POST'])
def generate_timeline():
    data = request.json
    project_category = data['project_category']
    team_members = data['team_members']
    start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
    end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')

    if project_category == 'event':
        tasks = event_tasks
    elif project_category == 'app_development':
        tasks = app_dev_tasks
    else:
        return jsonify({"error": "Invalid project category"}), 400

    forward_pass(tasks)
    backward_pass(tasks)
    calculate_slack(tasks)
    task_distribution = distribute_tasks(tasks, team_members)

    timeline = []
    for task in tasks:
        task_start_date = start_date + timedelta(days=task.early_start)
        task_end_date = start_date + timedelta(days=task.early_finish)
        timeline.append({
            "task": task.name,
            "start_date": task_start_date.strftime('%Y-%m-%d'),
            "end_date": task_end_date.strftime('%Y-%m-%d'),
            "assigned_to": task_distribution[task.name]
        })

    return jsonify(timeline)

def forward_pass(tasks):
    task_dict = {task.name: task for task in tasks}
    for task in tasks:
        if not task.dependencies:
            task.early_start = 0
            task.early_finish = task.duration
        else:
            task.early_start = max([task_dict[dep].early_finish for dep in task.dependencies])
            task.early_finish = task.early_start + task.duration

def backward_pass(tasks):
    last_task = max(tasks, key=lambda x: x.early_finish)
    last_task.late_finish = last_task.early_finish
    last_task.late_start = last_task.early_start
    for task in reversed(tasks):
        if not task.dependencies:
            task.late_finish = last_task.late_finish
            task.late_start = task.late_finish - task.duration
        else:
            task.late_finish = min([task.late_start for dep in task.dependencies])
            task.late_start = task.late_finish - task.duration

def calculate_slack(tasks):
    for task in tasks:
        task.slack = task.late_start - task.early_start

def distribute_tasks(tasks, team_members):
    # Assign roles based on project type
    roles = []
    if len(tasks) == len(event_tasks):
        roles = ["Event Coordinator", "Marketing Lead", "Logistics Manager", "Catering Manager", "Setup Coordinator", "Event Manager", "Cleanup Supervisor"]
    elif len(tasks) == len(app_dev_tasks):
        roles = ["Requirement Analyst", "Designer", "Developer", "Tester", "DevOps Engineer", "Maintenance Engineer"]

    task_distribution = {}
    for i, task in enumerate(tasks):
        task_distribution[task.name] = roles[i % team_members]

    return task_distribution

# if __name__ == "__main__":
    # app = Flask(__name__)
    # app.register_blueprint(expert_systems_bp)
    # app.run(debug=True)


class ProjectExpertSystem(KnowledgeEngine):

    @DefFacts()
    def _initial_action(self):
        yield Fact(action="identify_project_type")

    @Rule(Fact(action='identify_project_type'),
          Fact(project_category=MATCH.project_category),
          salience=1)
    def identify_project_type(self, project_category):
        self.declare(Fact(project_type=project_category))

    @Rule(Fact(action='identify_project_type'),
          NOT(Fact(project_category=W())), salience=1)
    def ask_project_category(self):
        self.declare(Fact(project_category=input("Apakah proyek ini adalah proyek aplikasi atau event? (app/event): ").strip().lower()))

    @Rule(Fact(action='identify_project_type'),
          Fact(project_type=MATCH.project_type),
          salience=0)
    def project_type_identified(self, project_type):
        if project_type == 'event':
            self.declare(Fact(tasks=event_tasks))
        elif project_type == 'app_development':
            self.declare(Fact(tasks=app_dev_tasks))
        self.declare(Fact(action='determine_team_size'))

    @Rule(Fact(action='determine_team_size'),
          NOT(Fact(team_members=W())), salience=1)
    def ask_team_size(self):
        self.declare(Fact(team_members=int(input("Berapa jumlah anggota tim? "))))

    @Rule(Fact(action='determine_team_size'),
          Fact(team_members=MATCH.team_members),
          salience=0)
    def team_size_identified(self, team_members):
        self.declare(Fact(action='set_project_dates'))

    @Rule(Fact(action='set_project_dates'),
          NOT(Fact(start_date=W())), salience=1)
    def ask_start_date(self):
        self.declare(Fact(start_date=input("Kapan tanggal mulai proyek? (YYYY-MM-DD): ")))

    @Rule(Fact(action='set_project_dates'),
          NOT(Fact(end_date=W())), salience=1)
    def ask_end_date(self):
        self.declare(Fact(end_date=input("Kapan tanggal berakhir proyek? (YYYY-MM-DD): ")))

    @Rule(Fact(action='set_project_dates'),
          Fact(start_date=MATCH.start_date),
          Fact(end_date=MATCH.end_date),
          salience=0)
    def dates_identified(self, start_date, end_date):
        self.declare(Fact(action='generate_timeline'))

    @Rule(Fact(action='generate_timeline'),
          Fact(tasks=MATCH.tasks),
          Fact(team_members=MATCH.team_members),
          Fact(start_date=MATCH.start_date),
          Fact(end_date=MATCH.end_date),
          salience=0)
    def generate_timeline(self, tasks, team_members, start_date, end_date):
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
        end_date = datetime.strptime(end_date, '%Y-%m-%d')

        forward_pass(tasks)
        backward_pass(tasks)
        calculate_slack(tasks)
        task_distribution = distribute_tasks(tasks, team_members)

        timeline = []
        for task in tasks:
            task_start_date = start_date + timedelta(days=task.early_start)
            task_end_date = start_date + timedelta(days=task.early_finish)
            timeline.append({
                "task": task.name,
                "start_date": task_start_date.strftime('%Y-%m-%d'),
                "end_date": task_end_date.strftime('%Y-%m-%d'),
                "assigned_to": task_distribution[task.name]
            })

        print(json.dumps(timeline, indent=4, ensure_ascii=False))

if __name__ == "__main__":
    app = Flask(__name__)
    app.register_blueprint(expert_systems_bp)
    app.run(debug=True)
    engine = ProjectExpertSystem()
    engine.reset()
    engine.run()


# # Initialize Flask app and blueprint
# app = Flask(__name__)
# expert_systems_bp = Blueprint('expert_systems', __name__, url_prefix='/expert-systems')

# # Define your routes and logic
# @app.route('/')
# def index():
#     return "Hello, this is the project management expert system."

# # Function to calculate the timeline based on dependencies and critical path
# def calculate_timeline(tasks):
#     # Placeholder implementation, you would replace this with your actual timeline calculation
#     for i, task in enumerate(tasks):
#         task["start_date"] = (datetime.now() + timedelta(days=i*2)).strftime('%Y-%m-%d')
#         task["end_date"] = (datetime.now() + timedelta(days=(i*2 + task["duration"]))).strftime('%Y-%m-%d')
#     return tasks

# @app.route('/generate-timeline', methods=['POST'])
# def generate_timeline():
#     data = request.json
#     project_category = data.get("project_category")
#     team_members = data.get("team_members")
#     start_date = data.get("start_date")
#     end_date = data.get("end_date")
    
#     # Placeholder tasks, you would replace this with your actual task breakdown
#     tasks = [
#         {"name": "Task 1", "duration": 5},
#         {"name": "Task 2", "duration": 3},
#         {"name": "Task 3", "duration": 2}
#     ]
    
#     timeline = calculate_timeline(tasks)
    
#     return jsonify({"timeline": timeline})

# if __name__ == '__main__':
#     app.register_blueprint(expert_systems_bp)
#     app.run(debug=True)