import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from datetime import datetime

# START
""" tasks = [
    ("Grundlagen", "2024-10-01", "2024-10-15"),
    ("Analyse Frameworks", "2024-10-15", "2024-11-04"),
    ("Methodik", "2024-11-04", "2024-11-15"),
    ("Umsetzung", "2024-11-15", "2024-12-05"),
    ("Evaluation (Dokumentation)", "2024-12-05", "2024-12-20"),
    ("Planung und Literaturrecherche", "2024-10-01", "2024-11-04"),
    ("Implementierung", "2024-11-04", "2024-12-05"),
    ("Auswertung", "2024-12-05", "2024-12-20"),
    ("Überarbeitung und Abgabe", "2024-12-20", "2025-01-13")
] """

# END
tasks = [
    ("Grundlagen", "2024-10-01", "2024-10-15"),
    ("Analyse Frameworks", "2024-10-15", "2024-11-04"),
    ("Methodik", "2024-11-04", "2024-11-15"),
    ("Umsetzung", "2024-11-15", "2024-12-19"),
    ("Evaluation (Dokumentation)", "2024-12-19", "2025-01-19"),
    ("Planung und Literaturrecherche", "2024-10-01", "2024-11-04"),
    ("Implementierung", "2024-11-04", "2024-12-19"),
    ("Auswertung", "2024-12-19", "2025-01-19"),
    ("Überarbeitung und Abgabe", "2024-12-19", "2025-01-29")
]

# Define colors for specific tasks
highlighted_tasks = {
    "Grundlagen": "#FFB6C1",  # Light pink
    "Analyse Frameworks": "#FFDAB9",  # Peach
    "Methodik": "#B0E0E6",  # Powder blue
    "Umsetzung": "#98FB98",  # Pale green
    "Evaluation (Dokumentation)": "#D8BFD8"  # Thistle
}

# Convert dates to datetime objects
task_names = [task[0] for task in tasks]
start_dates = [datetime.strptime(task[1], "%Y-%m-%d") for task in tasks]
end_dates = [datetime.strptime(task[2], "%Y-%m-%d") for task in tasks]

# Create the Gantt chart with tasks
fig, ax = plt.subplots(figsize=(10, 6))

for i, (task, start, end) in enumerate(zip(reversed(task_names), reversed(start_dates), reversed(end_dates))):
    color = highlighted_tasks.get(task, "steelblue")  # Use specific color if task is in highlighted list, otherwise default
    ax.barh(task, (end - start).days, left=start, color=color)

# Format the chart
ax.xaxis.set_major_formatter(mdates.DateFormatter("%d-%m-%Y"))
ax.set_xlabel("Zeitleiste")
ax.set_ylabel("Ziele")
ax.set_axisbelow(True)
ax.xaxis.set_major_locator(mdates.DayLocator(interval=5))


plt.title("Zeitplan")
plt.xticks(rotation=45)
plt.grid(axis="x", linestyle="--", alpha=0.7, linewidth = 0.5)
plt.grid(axis="y", linestyle="--", alpha=0.7, linewidth = 0.5)

# Show the plot
plt.tight_layout()
plt.show()