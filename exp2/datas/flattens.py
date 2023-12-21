import json
import os
import csv

# Directory containing JSON files
directory_path = "./data/"

# Function to transform participant data
def transform_participant_data(participant_data):
    camel_scores = [0] * 5
    camel_times = [0] * 5
    kebab_scores = [0] * 5
    kebab_times = [0] * 5

    # Load questionData dictionary
    question_data_dict = participant_data["questionData"]

    for _, question_data in question_data_dict.items():
        case_format = question_data["caseFormat"]
        is_correct = 1 if question_data["isCorrect"] else 0
        time_taken = question_data["timeTaken"]

        if case_format.startswith("camel"):
            camel_scores[int(case_format[-1]) - 1] = is_correct
            camel_times[int(case_format[-1]) - 1] = time_taken
        elif case_format.startswith("kebab"):
            kebab_scores[int(case_format[-1]) - 1] = is_correct
            kebab_times[int(case_format[-1]) - 1] = time_taken

    camel_average = sum(camel_times) / len(camel_times) if any(camel_times) else 0
    kebab_average = sum(kebab_times) / len(kebab_times) if any(kebab_times) else 0

    return {
        "participantID": participant_data["participantID"],
        "experience": participant_data["demographicsAnswers"][0]["experience"],
        "camel1_score": camel_scores[0],
        "camel2_score": camel_scores[1],
        "camel3_score": camel_scores[2],
        "camel4_score": camel_scores[3],
        "camel5_score": camel_scores[4],
        "camel1_time": camel_times[0],
        "camel2_time": camel_times[1],
        "camel3_time": camel_times[2],
        "camel4_time": camel_times[3],
        "camel5_time": camel_times[4],
        "camel_average": camel_average,
        "kebab1_score": kebab_scores[0],
        "kebab2_score": kebab_scores[1],
        "kebab3_score": kebab_scores[2],
        "kebab4_score": kebab_scores[3],
        "kebab5_score": kebab_scores[4],
        "kebab1_time": kebab_times[0],
        "kebab2_time": kebab_times[1],
        "kebab3_time": kebab_times[2],
        "kebab4_time": kebab_times[3],
        "kebab5_time": kebab_times[4],
        "kebab_average": kebab_average,
    }

# List to store transformed data for all participants
all_participants_data_transformed = []

# Loop through each file in the directory
for filename in os.listdir(directory_path):
    if filename.endswith(".json"):
        file_path = os.path.join(directory_path, filename)

        # Load data from the file
        with open(file_path, 'r') as file:
            data = json.load(file)

        # Transform data for each participant in the file
        participants_data_transformed = [transform_participant_data(data)]

        # Append transformed data to the list
        all_participants_data_transformed.extend(participants_data_transformed)

# CSV file path
csv_file_path = "./output.csv"

# Write data to CSV file
with open(csv_file_path, 'w', newline='') as csvfile:
    fieldnames = all_participants_data_transformed[0].keys()
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    # Write header
    writer.writeheader()

    # Write data rows
    for participant_data_transformed in all_participants_data_transformed:
        writer.writerow(participant_data_transformed)

print(f"Data has been saved to {csv_file_path}")