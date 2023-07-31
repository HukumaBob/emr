# Electronic Medical Record System

The Electronic Medical Record (EMR) system is a web-based application developed using Django and React JS. It provides healthcare professionals with a platform to efficiently manage and store patient medical records digitally. This system aims to streamline the process of recording, storing, and retrieving patient information, improving the overall efficiency and accuracy of healthcare services.

## Features

- User Authentication: The system supports user registration and login functionality to ensure secure access to patient records.
- Patient Management: Healthcare professionals can add, view, edit, and delete patient records. The system allows storing comprehensive patient information, including personal details, medical history, allergies, and prescribed medications.
- Appointment Scheduling: Users can schedule appointments with patients, view upcoming appointments, and manage their calendar.
- Medical Records Management: Healthcare professionals can record and update patient medical records, including diagnoses, treatments, lab results, and imaging reports.
- Search and Filtering: The system provides powerful search and filtering capabilities to quickly find patient records based on various criteria such as name, date, or medical condition.
- Reporting and Analytics: Generate reports and analytics based on patient data to gain insights and support decision-making processes.

## Technologies Used

- Django: A powerful Python web framework used for backend development, providing a robust and scalable foundation for the EMR system.
- React JS: A JavaScript framework for building user interfaces, used to develop the frontend of the application, providing a responsive and interactive user experience.
- PostgreSQL: A reliable and efficient open-source relational database used for storing patient and system data securely.
- RESTful APIs: The system utilizes RESTful APIs to establish communication between the frontend and backend, allowing seamless data exchange.
- HTML/CSS: The system's user interface is developed using HTML and CSS to ensure a visually appealing and user-friendly design.

## Installation and Setup

To run the EMR system locally, follow these steps:

1. Clone the repository:

```bash
git clone git@github.com:HukumaBob/emr.git
```

2. Install dependencies:

```bash
# Backend dependencies
cd backend
pip install -r requirements.txt

# Frontend dependencies
cd ../client
npm install
```

3. Database Setup:

   - Create a PostgreSQL database for the project.
   - Update the database configuration in the backend settings file (`backend/settings.py`) to connect to your database.

4. Run Migrations:

```bash
cd emr_system
python manage.py migrate
```

5. Start the Development Servers:

```bash
# Backend server (runs on http://localhost:8000/)
python manage.py runserver

# Frontend server (runs on http://localhost:3000/)
cd ../frontend
npm run serve
```

6. Access the EMR system:

Open your web browser and visit `http://localhost:3000/` to access the EMR system.
 
## Conclusion

The Electronic Medical Record system developed on Django and React JS provides a comprehensive solution for managing patient medical records efficiently. It combines the power of Django's backend capabilities with Vue.js's interactive frontend to create a user-friendly and feature-rich application. By adopting this EMR system, healthcare professionals can enhance their workflow, improve patient care, and streamline medical record management.
# emr
Electronic medical record system
